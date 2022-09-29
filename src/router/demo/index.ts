import nodeHtmlToImage from 'node-html-to-image'

const html = `
<html>
    <head>
      <style>
        body {
          background:#fff;
          width: 1000px;
          height: 1000px;
        }
      </style>
    </head>
    <body>Hello world!</body>
  </html>
`


export async function demo(req, res) {
    console.time('test')
    const imageBuffer = await nodeHtmlToImage({
        output: './img.png',
        transparent: true,
        html: html
    }) as Buffer
    console.timeEnd('test')
    res.send('ok')
}