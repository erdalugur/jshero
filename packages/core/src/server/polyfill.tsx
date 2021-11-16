import 'reflect-metadata'
import fetch from 'isomorphic-fetch'
import React from 'react'

React.useLayoutEffect = React.useEffect


if (!process.env.BROWSER) {
  (global as any).window = { 
    document: {},
    __INITIAL_STATE__: {}
  };
  global.fetch = fetch;
  (global as any).document = { };
}


export {}