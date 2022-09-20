// 登录验证的中间件

async function loginCheck (ctx, next) {
  const session = ctx.session || {}
  const userInfo = session.userInfo
  if (userInfo && userInfo.username) {
    // 登录验证通过
    await next()
    return
  }
  // 登录验证失败
  ctx.body = {
    errno: -1,
    message: '用户尚未登录'
  }
}

module.exports = loginCheck