declare global {
  interface Window {
    __INITIAL_STATE__: any
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: number;
      PWD: string;
      BROWSER: boolean
    }
    interface Window {
      __INITIAL_STATE__: any
      document: any
    }
  }
  
}
export {}