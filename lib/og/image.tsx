import path from 'path'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { ImageResponse } from 'next/og'
// App router includes @vercel/og.
// No need to install it.

export const imageSize = {
  width: 1200,
  height: 630,
}

export const imageContentType = 'image/png'

export function image(text: string) {
  try {
    const textToRender = text || APP_NAME

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: 'white',
            height: '100%',
            width: '100%',
            padding: '0 30%',
            fontSize: 60,
            fontFamily: '"JetBrains Mono"',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            border: '1px solid rgb(228, 228, 231)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: '0.8em',
              left: '0.8em',
              color: '#aaa',
            }}
          >
            <svg
              width="0.8em"
              height="0.8em"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM2 7.5C2 7.22386 2.22386 7 2.5 7H7.5C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8H2.5C2.22386 8 2 7.77614 2 7.5ZM2 10.5C2 10.2239 2.22386 10 2.5 10H10.5C10.7761 10 11 10.2239 11 10.5C11 10.7761 10.7761 11 10.5 11H2.5C2.22386 11 2 10.7761 2 10.5Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div
            style={{
              textAlign: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              lineClamp: 3,
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              lineHeight: '1.5em',
              maxHeight: '5em', // lineHeight * lineClamp + 0.5em
              maxWidth: '100%',
              wordBreak: 'break-all',
              lineBreak: 'anywhere',
            }}
          >
            {textToRender}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: '1.6em',
              right: '1.6em',
              fontSize: '0.5em',
              lineHeight: '1',
              color: '#aaa',
            }}
          >
            {AUTHOR}
          </div>
        </div>
      ),
      {
        width: imageSize.width,
        height: imageSize.height,
        fonts: [
          {
            name: 'JetBrains Mono',
            data: fontFile,
            style: 'italic',
            weight: 800,
          },
        ],
      }
    )
  } catch (e) {}
}

const fontFile = readFileSync(
  path.join(fileURLToPath(import.meta.url), '../JetBrainsMono-ExtraBoldItalic.ttf')
)

const { APP_NAME, NEXT_PUBLIC_AUTHOR: AUTHOR } = process.env
