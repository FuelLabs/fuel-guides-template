import ReactMarkdown from 'react-markdown';
import { cssObj } from '@fuel-ui/css';
import { Box } from '@fuel-ui/react';

export type MDXImportProps = {
  file: string;
  lineStart?: number;
  lineEnd?: number;
  linesIncluded?: number[];
  __content: string;
};

export function MDXImport({
  __content: content,
}: MDXImportProps) {
  return (
    <Box css={style}>
      <ReactMarkdown children={content} />
    </Box>
  );
}

const style = cssObj({
  margin: "20px 0",
  'pre': {
    whiteSpace: "normal",
  }
});