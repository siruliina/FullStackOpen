const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

commentsRouter.get('/:id/comments', async (request, response) => {
  const comments = await Comment.find({}).populate('blog', { title: 1 })

  if (comments) {
    response.json(comments)
  } else {
    response.status(404).end()
  }
})

commentsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body

  const blog = await Blog.findById(request.params.id)

  const comment = new Comment({
    comment: body.comment,
    blog: blog.id,
  })

  const commentAdded = await comment.save()
  blog.comments = blog.comments.concat(commentAdded._id)
  await blog.save()
  response.status(201), json(commentAdded)
})

module.exports = commentsRouter
