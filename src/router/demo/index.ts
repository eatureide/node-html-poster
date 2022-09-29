import nodeHtmlToImage from 'node-html-to-image'

const html = `
<html>
    <head>
      <style>
        body {
          background:#fff;
          width: 500px;
          height: 500px;
        }
      </style>
    </head>
    <body>Hello world!</body>
  </html>
`


export async function demo(req, res) {
    console.time('test')
    const imageBuffer = await nodeHtmlToImage({
        transparent: true,
        html: html
    }) as Buffer
    console.timeEnd('test')
    res.send('ok')
}