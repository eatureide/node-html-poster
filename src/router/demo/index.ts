import nodeHtmlToImage from 'node-html-to-image'
import path from 'path'
import font2base64 from 'node-font2base64'

const font = path.resolve(__dirname, '../../static/font/PingFangSC-Semibold.woff2')
const data = font2base64.encodeToDataUrlSync(font)

const fontStyle = `
  <style>
    @font-face {
      font-family: 'PingFangSC-Semibold';
      src: url(${data}) format('woff2');
    }
  </style>
`

const html =
`<html lang="en">

<head>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        body {
            width: 318px;
            height: 504px;
            color: #fff;
            box-sizing: border-box;
            overflow: hidden;
        }

        .blur {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 318px;
            height: 504px;
            background: rgba(0, 0, 0, .8);
        }

        .wrap {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            position: relative;
            border-radius: 16px;
            overflow: hidden;
            font-size: 30px;
            background: #1E2021;
            padding: 20px;
            background: url('https://images.ctfassets.net/yr4qj72ki4ky/legacyBlogPost77Thumbnail/cd4783ad7b35efc4367166a570a9952e/bigstock-Real-Java-Script-Code-Developi-217215433.jpg?q=72') center no-repeat;
            background-size: cover;
            overflow: hidden;
        }

        .content{
            position: relative;
            z-index: 2;
        }

        .p1 {
            font-family: PingFangSC-Semibold;
        }
    </style>
</head>

<body>
    <div class="wrap">
        <div class="blur"></div>
        <div class="content">
            <img src="https://www.googlefonts.cn/Public/google/logo.png" />
            <p class="p1">我是萍方</p>
            <p>我是普通字体</p>
        </div>
    </div>
</body>

</html>`

export async function demo(req, res) {
  const image = await nodeHtmlToImage({
    transparent: true,
    html: fontStyle + html
  })

  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(image, 'binary');
}