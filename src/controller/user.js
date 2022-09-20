// user controller

const User = require('../model/User')

// 登录
async function login (username, password) {
  // 查找数据库
  const user = await User.findOne({ username, password })
  return !!user
}

// 注册
async function register (userInfo = {}) {
  // 插入数据库
  const newUser = await User.create(userInfo)
  return newUser
}


module.exports = {
  register,
  login
}