import fs from 'fs';
import { globby } from 'globby';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { join } from 'path';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';

import { codeImport } from './code-import';
import { mdxImport } from './mdx-import';
import { codeExamples } from './code-examples';
import { rehypeExtractHeadings } from './toc';

import {
  DOCS_PATH,
  DOCS_DIRECTORY,
  DOCS_FOLDER_NAME,
  DOCS_REPO_LINK,
  FIELDS,
  FUEL_101_MENU,
  TOOLCHAIN_MENU,
  GRAPHQL_MENU,
  SWAY_MENU,
  RUST_MENU,
  FRONTEND_MENU,
  INDEXER_MENU
} from '~/src/constants';

import type { DocType, NodeHeading, SidebarLinkItem } from '~/src/types';

export async function getDocsSlugs() {
  const paths = await globby([`${DOCS_PATH}/**.mdx`, `${DOCS_PATH}/*/**.mdx`]);
  return paths.map((item) => item.replace(`${DOCS_PATH}/`, ''));
}

export function getDocFullPath(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullpath = join(DOCS_DIRECTORY, `${realSlug}.mdx`);
  return { fullpath, realSlug }
}

export async function getDocBySlug(
  slug: string,
  fields: string[] = []
): Promise<DocType> {
  const { fullpath, realSlug } = getDocFullPath(slug);
  const fileContents = fs.readFileSync(fullpath, 'utf8');
  const { data, content } = matter(fileContents);
  const pageLink = join(
    DOCS_REPO_LINK,
    fullpath.replace(DOCS_DIRECTORY, `/blob/main/${DOCS_FOLDER_NAME}/`)
  ).replace('https:/', 'https://');

  const doc = {
    pageLink,
  };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      doc[field] = data.slug || realSlug;
    }
    if (field === 'content') {
      doc[field] = content;
    }
    if (typeof data[field] !== 'undefined') {
      doc[field] = data[field];
    }
  });

  const headings: NodeHeading[] = [];
  let source = null

  try {
    source = await serialize(content, {
      scope: data,
      mdxOptions: {
        format: 'mdx',
        remarkPlugins: [
          remarkSlug,
          remarkGfm,
          [codeImport, { filepath: fullpath }],
          [mdxImport, { filepath: fullpath }],
          [codeExamples, { filepath: fullpath }],
        ],
        rehypePlugins: [[rehypeExtractHeadings, { headings }]],
      },
    });
  } catch (error) {
    throw new Error(`Error serializing ${slug}:\n${error}`);
  }

  return {
    ...doc,
    source,
    headings,
  } as DocType;
}

export async function getAllDocs(fields: string[] = []) {
  const slugs = await getDocsSlugs();
  return Promise.all(slugs.map((slug) => getDocBySlug(slug, fields)));
}

export async function getSidebarLinks(order: string[]) {
  const docs = await getAllDocs(FIELDS);
  const links = docs.reduce((list, doc) => {
    if (!doc.category) {
      return list.concat({ slug: doc.slug, label: doc.title });
    }

    const categoryIdx = list.findIndex((l) => {
      return l?.label === doc.category
    });
    /** Insert category item based on order prop */
    if (categoryIdx >= 0) {
      const submenu = list[categoryIdx]?.submenu || [];
      submenu.push({ slug: doc.slug, label: doc.title });
      return list;
    }
    const categorySlug = doc.slug.split('/')[0];
    const submenu = [{ slug: doc.slug, label: doc.title }];
    return list.concat({
      subpath: categorySlug,
      label: doc.category,
      submenu,
    });
    /** Insert inside category submenu if category is already on array */
  }, [] as SidebarLinkItem[]);

  const sortedLinks = links
    /** Sort first level links */
    .sort((a, b) => {
      const aIdx = order.indexOf(a.label);
      const bIdx = order.indexOf(b.label);
      if (!a.subpath && !b.subpath) {
        return aIdx - bIdx;
      }
      if (a.subpath && b.subpath) {
        const aFirst = order.filter((i) => i.startsWith(a.label))?.[0];
        const bFirst = order.filter((i) => i.startsWith(b.label))?.[0];
        return order.indexOf(aFirst) - order.indexOf(bFirst);
      }
      const category = a.subpath ? a.label : b.label;
      const first = order.filter((i) => i.startsWith(category))?.[0];
      const idx = order.indexOf(first);
      return a.subpath ? idx - bIdx : aIdx - idx;
    })
    /** Sort categoried links */
    .map((link) => {
      if (!link.submenu) return link;
      let catOrder: string[] = [];
      switch (link.label) {
        case "Fuel 101":
          catOrder = FUEL_101_MENU
          break;
        case "GraphQL API":
          catOrder = GRAPHQL_MENU
          break;
        case "The Fuel Toolchain":
          catOrder = TOOLCHAIN_MENU
          break;
        case "Building a Sway Contract":
          catOrder = SWAY_MENU
          break;
        case "Testing with Rust":
          catOrder = RUST_MENU
          break;
        case "Making a Frontend":
          catOrder = FRONTEND_MENU
          break;
        case "Building an Indexer":
          catOrder = INDEXER_MENU
          break;
        default:
      }

      const submenu = link.submenu
        .sort(
          (a, b) => {
            return catOrder.indexOf(`${a.label}`) - catOrder.indexOf(`${b.label}`)
          }
        );
      return { ...link, submenu };
    });

  const withNextAndPrev = [...sortedLinks].map((doc, idx) => {
    if (doc.submenu) {
      return {
        ...doc,
        submenu: doc.submenu.map((childDoc, cIdx) => {
          const prev = doc.submenu?.[cIdx - 1] ?? sortedLinks[idx - 1] ?? null;
          const next = doc.submenu?.[cIdx + 1] ?? sortedLinks[idx + 1] ?? null;
          return {
            ...childDoc,
            prev: prev?.submenu ? prev.submenu[prev.submenu.length - 1] : prev,
            next: next?.submenu ? next.submenu[0] : next,
          };
        }),
      };
    }
    const prev = sortedLinks[idx - 1] ?? null;
    const next = sortedLinks[idx + 1] ?? null;
    return {
      ...doc,
      prev: prev?.submenu ? prev.submenu[prev.submenu.length - 1] : prev,
      next: next?.submenu ? next.submenu[0] : next,
    };
  });

  return withNextAndPrev;
}
