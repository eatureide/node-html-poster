import nodeHtmlToImage from 'node-html-to-image'

const html = `<html>

<head>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        body {
            width: 318px;
            height: 504px;
        }

        .wrap {
            width: 100%;
            height: 100%;
            position: relative;
            background: url('https://mystore-h5.watsonsvip.com.cn/b-makeup%2Fb-makeup-look.png') center no-repeat;
            background-size: contain;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .img1 {
            width: 50%;
            height: 35%;
        }

        p {
            color: #202124;
            font-size: 30px;
            text-align: center;
            position: absolute;
            top: 0;
            left: 0;
        }

        .wrap {
            border-radius: 20px;
            overflow: hidden;
        }
    </style>
</head>

<body>
    <div class="wrap">
        <p>索尼已经要断气了</p>
        <img class="img1"
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.mouldu.com%2Fuploadfile%2F2020%2F0313%2F20200313111835473.png&refer=http%3A%2F%2Fwww.mouldu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667048373&t=a3cc518437c9964630b98991969b40e3" />
    </div>
</body>

</html>`


export async function demo(req, res) {
  const counter = 10
  let count = 0
  let timer = null
  const fn = async () => {
    console.time(`第${count}次`)
    const time = new Date().valueOf()
    await nodeHtmlToImage({
      transparent: true,
      output: `./static/${time}.png`,
      html
    })
    console.timeEnd(`第${count}次`)
  }

  timer = setInterval(() => {
    if (count !== counter) {
      count = count + 1
      fn()
    }
    if (count === counter) {
      clearInterval(timer)
    }
  }, 1500)

  res.send('ok')
}