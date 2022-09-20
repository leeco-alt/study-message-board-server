const router = require('koa-router')()
const { register, login } = require('../controller/user')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/users')

// 获取用户信息
router.get('/getUserInfo', loginCheck, async (ctx, next) => {
  ctx.body = {
    errno: 0,
    data: ctx.session.userInfo
  }
})

// 登录
router.post('/login', async (ctx, next) => {
  // 获取登录信息
  const { username, password } = ctx.request.body
  // 验证登录
  const res = await login(username, password)
  if (res) {
    // 登录成功

    // 设置 session
    ctx.session.userInfo = {
      username
    }

    // 返回
    ctx.body = {
      errno: 0
    }
  } else {
    ctx.body = {
      errno: -1,
      message: '登录验证失败'
    }
  }
})

// 注册
router.post('/register', async (ctx, next) => {
  // 获取注册信息
  const userInfo = ctx.request.body
  // 提交注册
  try {
    const nweUser = await register(userInfo)
    // 成功
    ctx.body = {
      errno: 0,
      data: nweUser
    }
  } catch (err) {
    // 失败
    console.error('注册失败', err);
    ctx.body = {
      errno: -1,
      message: '注册失败'
    }
  }
})

module.exports = router
