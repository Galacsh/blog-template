import { readFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { ImageResponse } from 'next/og'

export const imageSize = {
  width: 1200,
  height: 630,
}

export const imageContentType = 'image/png'

export function image(text: string) {
  try {
    return new ImageResponse(
      (
        // Container
        <div
          style={{
            backgroundColor: 'white',
            height: '100%',
            width: '100%',
            fontSize: 60,
            fontFamily: '"JetBrains Mono", Pretendard',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            border: '1px solid rgb(228, 228, 231)',
            boxSizing: 'border-box',
          }}
        >
          {/* Top left icon */}
          <svg
            width="0.8em"
            height="0.8em"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: 'absolute',
              top: '0.8em',
              left: '0.8em',
              color: '#aaa',
            }}
          >
            <path
              d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM2 7.5C2 7.22386 2.22386 7 2.5 7H7.5C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8H2.5C2.22386 8 2 7.77614 2 7.5ZM2 10.5C2 10.2239 2.22386 10 2.5 10H10.5C10.7761 10 11 10.2239 11 10.5C11 10.7761 10.7761 11 10.5 11H2.5C2.22386 11 2 10.7761 2 10.5Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          {/* Text area */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: imageSize.height + 'px',
              height: '100%',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                lineClamp: 4,
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.25,
                maxHeight: '100%',
                maxWidth: '100%',
                padding: '0.25em',
                wordBreak: 'break-word',
                lineBreak: 'anywhere',
              }}
            >
              {text}
            </div>
          </div>
          {/* Bottom right author */}
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
            data: jetbrainsMono,
            style: 'italic',
            weight: 800,
          },
          {
            name: 'Pretendard',
            data: pretendard,
            weight: 800,
          },
        ],
      }
    )
  } catch (e) {}
}

const jetbrainsMono = readFileSync(
  join(fileURLToPath(import.meta.url), '../JetBrainsMono-ExtraBoldItalic.ttf')
)

const pretendard = readFileSync(join(fileURLToPath(import.meta.url), '../Pretendard-ExtraBold.otf'))

const AUTHOR = process.env.NEXT_PUBLIC_AUTHOR
