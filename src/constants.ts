import { join } from 'path';
import ogImage from '../public/og-image.png';
import filenames from './generatedConstants/filenames.json'
import headings from './generatedConstants/headings.json'

// FIXME: handle dynamic orders and constants

// export const MENU_ORDER = headings
export const MENU_ORDER = [
  'Welcome',
  'Fuel 101',
  'GraphQL API',
  'The Fuel Toolchain',
  'Building a Sway Contract',
  'Testing with Rust',
  'Making a Frontend',
  'Building an Indexer',
  'Wrapping Up'
];

export const MENU_DESCRIPTIONS = [
  '',
  'Learn the fundamentals of the Fuel network.',
  'Learn about the Fuel GraphQL API',
  'Install and get started with the Fuel toolchain',
  'Build a Sway Contract for a game',
  'Write a test for a contract with the Rust SDK',
  'Make a React frontend for a Sway game contract.',
  'Build an indexer for a Sway contract',
  'Add final touches to your dapp'
];


export const HEADER_TITLE = headings[0]

const URL = "https://graphql-docs.fuel.network/"

export const FIELDS = ['title', 'slug', 'content', 'category'];
export const REPO_LINK = 'https://github.com/FuelLabs/fuel-graphql-docs/';
export const DOCS_REPO_LINK = REPO_LINK;

// TODO: Dynamic this
// export const DEFAULT_SLUG = [filenames[0]];
export const DEFAULT_SLUG = ['welcome'];


export const DOCS_PATH_NAME = 'journey'
export const DOCS_PATH = `../fuel-journey/${DOCS_PATH_NAME}`
export const DOCS_DIRECTORY = join(process.cwd(), DOCS_PATH);



export const META_DESC =
  'Official documentation for the Fuel GraphQL API';

export const META_OGIMG = URL + ogImage.src;

export const LABELS = {
  HOW_TO_USE_GRAPHQL: "How to use graph ql",
  REFERENCE: "'Reference'",
}


export const SUB_MENU_ORDER = {
  HOW_TO_USE_GRAPHQL: [
    'What is GraphQL?',
    'Schema & Type System'
  ],
  REFERENCE: [

  ]
}