declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: number;
      PWD: string;
      BROWSER: boolean
      JSHERO_PUBLIC_URL: string
      JSHERO_DOGS_URL: string
    }
  }
}

export {}