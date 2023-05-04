/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { ThemeProvider } from '@fuel-ui/react';
import { MDXProvider } from '@mdx-js/react';
import type { ReactNode } from 'react';

import * as Examples from '~/examples';

import { Blockquote } from './Blockquote';
import { Code } from './Code';
import { CodeImport } from './CodeImport';
import { MDBookImport } from './MDBookImport';
import { MDXImport } from './MDXImport';
import { CodeExamples } from './CodeExamples';
import { Heading } from './Heading';
import { Link } from './Link';
import { UL } from './List';
import { Paragraph } from './Paragraph';
import Player from './Player';
import { Pre } from './Pre';
import { Table } from './Table';
import CourseCards from './CourseCards';
import Task from './Task';
import Quiz from './Quiz';
import QuizMultipleChoice from './QuizMultipleChoice';
import TweetButton from './TweetButton';
import Image from 'next/image';

const components = {
  a: Link,
  h1: Heading,
  h2: Heading,
  h3: Heading,
  h4: Heading,
  h5: Heading,
  h6: Heading,
  pre: Pre,
  p: Paragraph,
  code: Code,
  blockquote: Blockquote,
  table: Table,
  ul: UL,
  CodeImport,
  MDBookImport,
  MDXImport,
  Player,
  CourseCards,
  Task,
  Quiz,
  QuizMultipleChoice,
  TweetButton,
  Image,
  Examples,
  CodeExamples
};

type ProviderProps = {
  children: ReactNode;
};

export function Provider({ children }: ProviderProps) {
  return (
    <MDXProvider components={components as any}>
      <ThemeProvider>{children}</ThemeProvider>
    </MDXProvider>
  );
}
