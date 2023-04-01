import { join } from 'path';
import ogImage from '../public/og-image.png';
import filenames from './generatedConstants/filenames.json'
import headings from './generatedConstants/headings.json'

export const MENU_ORDER = headings
// export const MENU_ORDER = [
//   "Intro to Sway for JS Dev"
// ]
console.log("headings type", typeof MENU_ORDER);
console.log("headings ", MENU_ORDER);


export const HEADER_TITLE = "Proof of concept"


const URL = "https://graphql-docs.fuel.network/"

export const FIELDS = ['title', 'slug', 'content', 'category'];
export const REPO_LINK = 'https://github.com/FuelLabs/fuel-graphql-docs/';
export const DOCS_REPO_LINK = REPO_LINK;

// TODO: Dynamic this
export const DEFAULT_SLUG = [filenames[0]];
console.log(DEFAULT_SLUG);


export const DOCS_DIRECTORY = join(process.cwd(), './docs');



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