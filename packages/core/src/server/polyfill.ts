import 'reflect-metadata'
import fetch from 'isomorphic-fetch'



if (!process.env.BROWSER) {
  (global as any).window = { 
    document: {},
    __INITIAL_STATE__: {}
  };
  global.fetch = fetch;
  (global as any).document = { };
}


export {}