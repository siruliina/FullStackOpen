import { useState } from "react"

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div> 
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>{visible? 'hide' : 'view'}</button>
        {visible? 
          <div>
            <a href={blog.url}>{blog.url}</a><br />
            {blog.likes}<button>like</button><br />
            {blog.user.name}
          </div>
        : null}
      </div>
  </div>
)}

export default Blog