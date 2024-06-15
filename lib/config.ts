function errorIfUndefined(name: string, value: string | undefined) {
  if (value === undefined) {
    throw new Error(`Environment variable '${name}' is not defined`)
  }
  return value
}

function undefinedIfEmpty(value: string | undefined) {
  if (value == null) return undefined
  else if (value === '') return undefined
  return value
}

// ===============
// == Essential ==
// ===============

const name = errorIfUndefined('NEXT_PUBLIC_APP_NAME', process.env.NEXT_PUBLIC_APP_NAME)
const shortName = errorIfUndefined(
  'NEXT_PUBLIC_APP_SHORT_NAME',
  process.env.NEXT_PUBLIC_APP_SHORT_NAME
)
const description = errorIfUndefined(
  'NEXT_PUBLIC_APP_DESCRIPTION',
  process.env.NEXT_PUBLIC_APP_DESCRIPTION
)
const baseUrlDefined = errorIfUndefined('NEXT_PUBLIC_BASE_URL', process.env.NEXT_PUBLIC_BASE_URL)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const baseUrl = baseUrlDefined + basePath
const author = errorIfUndefined('NEXT_PUBLIC_AUTHOR', process.env.NEXT_PUBLIC_AUTHOR)
const about = errorIfUndefined('NEXT_PUBLIC_ABOUT', process.env.NEXT_PUBLIC_ABOUT)
const contact = errorIfUndefined('NEXT_PUBLIC_CONTACT', process.env.NEXT_PUBLIC_CONTACT)
const keywords = errorIfUndefined('NEXT_PUBLIC_KEYWORDS', process.env.NEXT_PUBLIC_KEYWORDS)
const copyrightRange = errorIfUndefined(
  'NEXT_PUBLIC_COPYRIGHT_RANGE',
  process.env.NEXT_PUBLIC_COPYRIGHT_RANGE
)

// ==============
// == Optional ==
// ==============

const github = undefinedIfEmpty(process.env.NEXT_PUBLIC_GITHUB)
const linkedin = undefinedIfEmpty(process.env.NEXT_PUBLIC_LINKEDIN)
const gaId = undefinedIfEmpty(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS)

const googleVerification = undefinedIfEmpty(process.env.NEXT_PUBLIC_VERIFICATION_GOOGLE)
const naverVerification = undefinedIfEmpty(process.env.NEXT_PUBLIC_VERIFICATION_NAVER)
const verification = {
  google: googleVerification,
  other: naverVerification != null ? { 'naver-site-verification': naverVerification } : undefined,
}

export const config = {
  name,
  shortName,
  description,
  baseUrl,
  basePath,
  author,
  about,
  contact,
  keywords,
  github,
  linkedin,
  copyrightRange,
  gaId,
  verification,
}
