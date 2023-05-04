import { cssObj } from '@fuel-ui/css';
import { Link } from '@fuel-ui/react';
import { MDXRemote } from 'next-mdx-remote';

import { Pre } from './Pre';

import { REPO_LINK } from '~/src/constants';

export type MDBookProps = {
  file: string;
  lineStart?: number;
  lineEnd?: number;
  testCase?: string;
  title?: string;
  __content: string;
};

export function MDBookImport({
  __content: content,
}: MDBookProps) {
  return (
    <MDXRemote
      compiledSource={'# Hello'}
    />
  );
}