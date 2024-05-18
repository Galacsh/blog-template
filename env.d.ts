declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_NAME: string
      APP_SHORT_NAME: string
      APP_DESCRIPTION: string
      BASE_URL: string
    }
  }
}

export {}
