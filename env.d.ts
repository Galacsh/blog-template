declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_NAME: string
      NEXT_PUBLIC_APP_SHORT_NAME: string
      NEXT_PUBLIC_APP_DESCRIPTION: string
      NEXT_PUBLIC_BASE_URL: string
      NEXT_PUBLIC_BASE_PATH: string
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
