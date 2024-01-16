import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('clicking the button calls event handler once', async () => {

  const user = userEvent.setup()
  const createBlog = jest.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const addBlogButton = screen.getByText('create new blog')
  await user.click(addBlogButton)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')

  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'Blog 1')
  await user.type(authorInput, 'Author 1')
  await user.type(urlInput, 'Url 1')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  const createdBlog = createBlog.mock.calls[0][0]
  expect(createdBlog.title).toBe('Blog 1')
  expect(createdBlog.author).toBe('Author 1')
  expect(createdBlog.url).toBe('Url 1')
})