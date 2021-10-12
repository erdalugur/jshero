declare global {
  function resolveApp(relativePath: string): string
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: number;
      PWD: string;
      BROWSER: boolean
      BRANCH: string
      JSHERO_DB: string
      JSHERO_USER: string
      JSHERO_PASSWORD: string
      JSHERO_PUBLIC_URL: string
      JSHERO_DOGS_URL: string
    }
  }
  interface Window {
    __INITIAL_STATE__: any
  }
}

export {}