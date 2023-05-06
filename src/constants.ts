import { join } from 'path';
import ogImage from '../public/og-image.png';


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


export const FUEL_101_MENU = [
  'What is Fuel',
  'Modular Blockchains',
  'The Fuel VM',
  'UTXO Model',
  'Developer Tooling'
]

export const TOOLCHAIN_MENU = [
  'Fuelup',
  'Fuel Core',
  'Forc'
]

export const GRAPHQL_MENU = [
  'GraphQL Basics',
  'Setup',
  'Querying from a Dapp',
  'Building a Block Explorer',
]

export const SWAY_MENU = [
  'Setup',
  'Buying Seeds',
  'Planting Seeds',
  'Harvesting',
  'Selling',
  'Leveling Up',
  'Deploying',
]

export const RUST_MENU = [
  'Rust Basics',
  'Setup',
  'Understanding the Template',
  'Using Different Wallets',
  'Calling a Contract',
  'Making a New Player',
  'Read Only Calls',
  'Buying Seeds',
  'Planting and Harvesting',
  'Selling and Leveling Up',
]

export const FRONTEND_MENU = [
  'Setup',
  'Fuel Wallet',
  'Connecting to a Contract',
  'New Player',
  'Buying Seeds',
  'Planting Seeds',
  'Harvesting',
  'Selling Items',
  'Leveling Up',
]

export const INDEXER_MENU = [
  'Setup',
  'Manifest',
  'Schema',
  'WASM Module',
  'Deploying',
  'Updating the Frontend'
]


export const URL = ""

export const FIELDS = ['title', 'slug', 'content', 'category'];
export const REPO_LINK = '';
export const DOCS_REPO_LINK = REPO_LINK;
export const DEFAULT_SLUG = ['welcome'];

export const META_DESC =
  'Learn how to develop decentralized applications on the Fuel network';

export const META_OGIMG = URL + ogImage.src;
export const HEADER_TITLE = 'Fuel Journey'

export const DOCS_FOLDER_NAME = 'journey'
export const DOCS_PATH = `../fuel-journey/${DOCS_FOLDER_NAME}`
export const DOCS_DIRECTORY = join(process.cwd(), DOCS_PATH);