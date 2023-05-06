/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from "node:fs";
import { EOL } from "os";
import path from "path";
import type { Root } from "remark-gfm";
import { visit } from "unist-util-visit";
import type { Parent } from "unist-util-visit";

function extractLines(
  content: string,
  fromLine: number | undefined,
  toLine: number | undefined,
  linesIncluded: number[]
) {
  const lines = content.split(EOL);
  const start = fromLine || 1;
  let end;
  if (toLine) {
    end = toLine;
  } else if (lines[lines.length - 1] === "") {
    end = lines.length - 1;
  } else {
    end = lines.length;
  }
  if (linesIncluded.length > 0) {
    let newLines = linesIncluded.map((line) => line - start);
    return lines
      .slice(start - 1, end)
      .filter((_line, index) => newLines.includes(index))
      .join("\n");
  } else {
    return lines.slice(start - 1, end).join("\n");
  }
}

function extractCommentBlock(content: string, comment: string) {
  const lines = content.split(EOL);
  let lineStart = 1;
  let lineEnd = 1;
  for (let i = 0; i < lines.length; i++) {
    let start = lines[i] === `<!-- ${comment}:example:start -->`;
    if (start === true) {
      lineStart = i + 1;
    } else {
      let end = lines[i] === `<!-- ${comment}:example:end -->`;
      if (end === true) {
        lineEnd = i;
      }
    }
  }

  if (lineStart < 0) {
    lineStart = 0;
  }
  if (lineEnd < 0) {
    lineEnd = lines.length;
  }

  const linesContent = lines.slice(lineStart, lineEnd).join("\n");

  return {
    content: linesContent,
    lineStart,
    lineEnd,
  };
}

const files = new Map<string, string>();
const attrsList = new Map<string, any[]>();

function getFilesOnCache(filepath: string) {
  const oldResults = files.get(filepath);
  if (!oldResults) files.set(filepath, String(fs.readFileSync(filepath)));
  return files.get(filepath);
}

interface Options {
  filepath: string;
}

export function mdxImport(options: Options = { filepath: "" }) {
  const rootDir = process.cwd();
  const { filepath } = options;
  const dirname = path.relative(rootDir, path.dirname(filepath));

  return function transformer(tree: Root) {
    const nodes: [any, number | null, Parent][] = [];

    visit(tree, "mdxJsxFlowElement", (node: any, idx, parent) => {
      if (node.name === "MDXImport") {
        nodes.push([node as any, idx, parent as Parent]);
      }
    });

    nodes.forEach(([node]) => {
      const attr = node.attributes;
      let content = "";

      if (!attr.length) {
        throw new Error("MDXImport needs to have properties defined");
      }

      const file = attr.find((i: any) => i.name === "file")?.value;
      let lineStart = attr.find((i: any) => i.name === "lineStart")?.value;
      let lineEnd = attr.find((i: any) => i.name === "lineEnd")?.value;
      let comment = attr.find((i: any) => i.name === "comment")?.value;
      let linesIncluded =
        attr.find((i: any) => i.name === "linesIncluded")?.value || [];
      const fileAbsPath = path.resolve(path.join(rootDir, dirname), file);
      const fileContent = fs.readFileSync(fileAbsPath, "utf8");
      const cachedFile = getFilesOnCache(fileAbsPath);
      const attrId = `${fileAbsPath}${lineStart || ""}${lineEnd || ""}${comment || ""
        }`;
      const oldList = attrsList.get(attrId);
      let resp = Array.isArray(linesIncluded) ? 0 : linesIncluded;
      if (resp !== 0) {
        linesIncluded = JSON.parse(linesIncluded.value);
      }

      /** Return result from cache if file content is the same */
      if (fileContent === cachedFile && oldList) {
        node.attributes.push(...attrsList.get(attrId)!);
        return;
      }
      if (lineStart || lineEnd) {
        if (!lineStart) lineStart = 1;
        if (!lineEnd) lineEnd = 1;
        content = extractLines(fileContent, lineStart, lineEnd, linesIncluded);
      } else if (comment) {
        const commentResult = extractCommentBlock(fileContent, comment);
        lineStart = commentResult.lineStart;
        lineEnd = commentResult.lineEnd;
        content = commentResult.content;
      }

      const newAttrs = [
        {
          name: "__content",
          type: "mdxJsxAttribute",
          value: content,
        },
      ];

      node.attributes.push(...newAttrs);

      /** Add results on cache */
      attrsList.set(attrId, newAttrs);
    });
  };
}
