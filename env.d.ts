declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_NAME: string
      APP_SHORT_NAME: string
      APP_DESCRIPTION: string
      BASE_URL: string
      NEXT_PUBLIC_AUTHOR: string
      NEXT_PUBLIC_ABOUT: string
      NEXT_PUBLIC_CONTACT: string
      NEXT_PUBLIC_KEYWORDS: string
      NEXT_PUBLIC_GITHUB?: string
      NEXT_PUBLIC_LINKEDIN?: string
      NEXT_PUBLIC_COPYRIGHT_RANGE: string
      POSTS_PATH: string
    }
  }
}

export {}
