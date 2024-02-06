import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(blog)
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateBlog = async (blog) => {
  const response = await axios.put(`${baseUrl + '/' + blog.id}`, blog)
  return response.data
}

const deleteBlog = async (blogId, userToken) => {
  const response = await axios.delete(`${baseUrl + '/' + blogId}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
  return response.data
}

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl + '/' + id + '/comments'}`, {
    comment: comment,
  })
  return response.data
}

export default {
  getAll,
  createBlog,
  setToken,
  updateBlog,
  deleteBlog,
  addComment,
}
