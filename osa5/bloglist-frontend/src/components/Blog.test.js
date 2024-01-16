import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  test('renders content', () => {
    const blog = {
      title: 'Blog 1',
      author: 'Author 1',
      url: 'Url 1',
      likes: 5
    }

    const user = {
      username: 'username',
      name: 'name'
    }

    render(<Blog blog={blog} user={user}/>)

    screen.debug()

    const element = screen.getByText('Blog 1 Author 1')

    expect(element).toBeDefined()

  })

  test('clicking the view button makes the info visible', async () => {
    const blog = {
      title: 'Blog 1',
      author: 'Author 1',
      url: 'Url 1',
      likes: 5,
      user: {
        username: 'Username 1',
        name: 'Name 1'
      }
    }

    const user = {
      username: 'Username 1',
      name: 'Name 1'
    }

    const container = render(
      <Blog blog={blog} user={user}/>
    ).container

    const buttonUser = userEvent.setup()
    const button = screen.getByText('view')
    await buttonUser.click(button)

    screen.debug()

    const div = container.querySelector('.visibleTest')

    expect(div).toHaveTextContent('Url 15likeName 1remove')
  })
})