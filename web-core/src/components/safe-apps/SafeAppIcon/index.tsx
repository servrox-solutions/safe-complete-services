import { type ReactElement, memo } from 'react'

const APP_LOGO_FALLBACK_IMAGE = `/images/apps/app-placeholder.svg`

const getIframeContent = (url: string, width: number, height: number): string => {
  return `
     <body style="margin: 0; overflow: hidden;">
       <img src="${encodeURI(url)}" alt="App logo" width="${width}" height="${height}" />
       <script>
          document.querySelector("img").onerror = (e) => {
           e.target.onerror = null
           e.target.src = "${APP_LOGO_FALLBACK_IMAGE}"
         }
       </script>
     </body>
  `
}

const SafeAppIcon = ({
  src,
  alt,
  width = 40,
  height = 40,
}: {
  src: string
  alt: string
  width?: number
  height?: number
}): ReactElement => {
  return (
    <iframe
      title={alt}
      srcDoc={getIframeContent(src, width, height)}
      sandbox="allow-scripts"
      referrerPolicy="strict-origin"
      width={width}
      height={height}
      style={{ pointerEvents: 'none', border: 0 }}
      tabIndex={-1}
    />
  )
}

export default memo(SafeAppIcon)
