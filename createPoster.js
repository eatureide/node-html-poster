const nodeHtmlToImage = require('node-html-to-image')

const html = `<html>

<head>
    <style>
        *{
            padding:0;
            margin:0;
        }
        body {
            width: 318px;
            height: 504px;
        }
        body img{
            width:100%;
            height:100%
        }
        div {
            width: 318px;
            height: 504px;
            background: url('https://mystore-h5.watsonsvip.com.cn/b-makeup%2Fb-makeup-look.png') center-repeast;
            background-size: contain;
            color: "#fff";
            font-size: 30px;
        }
        p{
            color:#202124;
            font-size:30px;
            text-align:center;
            position:absolute;
            top:0;
            left:0;
        }
    </style>
</head>

<body>
<p>牛逼晶晶闪亮亮</p>
<img src="https://mystore-h5.watsonsvip.com.cn/b-makeup%2Fb-makeup-look.png"/>
</body>

</html>`

async function createPoster(req, res) {
    const currentTime = new Date().valueOf()
    const output = currentTime + '.png'

    const image = await nodeHtmlToImage({
        output,
        html
    })

    const base64Image = new Buffer.from(image).toString('base64');
    const dataURI = 'data:image/jpeg;base64,' + base64Image

    res.set({ 'Content-Type': 'text/html' })
    res.send(`<img src=${dataURI} />`)
}

module.exports = createPoster