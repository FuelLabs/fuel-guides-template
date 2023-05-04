/* eslint-disable import/no-named-default */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    default as DocPage,
    getStaticProps as docsGetStaticProps,
  } from './[...slug]';
  
  export default function Journey(props: any) {
    return <DocPage {...props} />;
  }
  
  export async function getStaticProps() {
    return docsGetStaticProps({ params: { slug: ['welcome'] } });
  }
  