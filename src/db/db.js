const mongoose = require('mongoose')

const uri = 'mongodb://localhost:27017'
const dbName = 'comment3'

const MONGODB_URI = process.env.MONGODB_URI || `${uri}/${dbName}`

// 开始链接
mongoose.connect(MONGODB_URI)

// 获取连接对象
const conn = mongoose.connection

conn.on('error', err => {
  console.error('连接数据库出错', err);
})

module.exports = mongoose