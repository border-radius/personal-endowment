var express = require('express')
var app = express()
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    setTimeout(next, 1000)
})
app.use(express.static('/home/user/self/etf/src'))
app.listen(4444)
