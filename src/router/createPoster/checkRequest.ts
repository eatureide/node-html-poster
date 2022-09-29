export function checkRequest(req, res, next) {
    const { html } = req.body
    // 如果不是html的话，返回报错
    if (!html) {
        res.send({
            code: 99999,
            message: '缺少html或不是标准html字符串'
        })
    }
    next()
}