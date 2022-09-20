const router = require('koa-router')()
const { getList, create, del, update } = require('../controller/comment')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/comment')

// 更新留言
router.post('/update', loginCheck, async (ctx, next) => {
  // 获取 ID content
  const { _id, content } = ctx.request.body
  // 获取用户名
  const { username } = ctx.session.userInfo
  // 执行更新
  try {
    const newData = await update(_id, username, content)
    ctx.body = {
      errno: 0,
      data: newData
    }
  } catch (err) {
    console.error('更新失败', err);
    ctx.body = {
      errno: -1,
      message: '更新失败'
    }
  }
})

// 删除留言
router.post('/del', loginCheck, async (ctx, next) => {
  // 获取 id
  const { _id } = ctx.request.body
  const { username } = ctx.session.userInfo
  // 执行删除
  try {
    await del(_id, username)
    ctx.body = {
      errno: 0
    }
  } catch (err) {
    console.error('删除失败', err);
    ctx.body = {
      errno: -1,
      message: '删除失败'
    }
  }
})

// 获取留言列表
router.get('/list', loginCheck, async (ctx, next) => {
  // 获取 filterType 1-全部 2-自己
  let { filterType } = ctx.query
  filterType = ~~filterType || 1

  // 获取当前用户名
  let username = ''
  if (filterType === 2) {
    username = ctx.session.userInfo.username
  }

  // 获取留言列表
  const list = await getList(username)
  ctx.body = {
    errno: 0,
    data: list
  }

})

// 创建留言
router.post('/create', loginCheck, async (ctx, next) => {
  // 获取留言信息
  const { content } = ctx.request.body
  const { username } = ctx.session.userInfo

  try {
    // 提交留言
    const newComment = await create(content, username)

    // 返回
    ctx.body = {
      errno: 0,
      data: newComment
    }
  } catch (err) {
    console.error('创建留言失败', err);
    ctx.body = {
      errno: -1,
      message: '创建留言失败'
    }
  }
})

module.exports = router