const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
 
beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('2 blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
  expect(response.type).toBe('application/json')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the blogs are identified with id', async () => {
  const response = await api.get('/api/blogs')
  response.body.map(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'Canonical string reduction'
  )
})

afterAll(async () => {
  await mongoose.connection.close()
})