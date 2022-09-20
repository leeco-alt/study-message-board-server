// 留言 controller

const Comment = require('../model/Comment')

// 更新留言
async function update (_id, username, content) {
  const newData = Comment.findOneAndUpdate(
    { _id, username },
    { content },
    { new: true }
  )
  return newData
}

// 删除留言
async function del (_id, username) {
  await Comment.deleteOne({ _id, username })
}

// 获取留言列表
async function getList (username = '') {
  const whereOpt = {}
  if (username) {
    whereOpt.username = username
  }
  const list = await Comment.find(whereOpt).sort({ id: -1 })
  return list
}

// 创建留言
async function create (content, username) {
  // 保存数据库
  const newComment = Comment.create({
    content,
    username
  })
  return newComment
}

module.exports = {
  getList,
  create,
  del,
  update
}