import localFont from 'next/font/local'

export const pretendard = localFont({
  src: '../public/fonts/PretendardStdVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '45 920',
})

export const jetbrainsMono = localFont({
  src: [
    {
      path: '../public/fonts/JetBrainsMono-VariableFont_wght.ttf',
      style: 'normal',
    },
    {
      path: '../public/fonts/JetBrainsMono-Italic-VariableFont_wght.ttf',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})
