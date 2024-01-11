import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, user, setUser }) => {
  const [visible, setVisible] = useState(false);
  const [updatedBlog, setUpdatedBlog] = useState(blog);


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const addLike = async () => {
    try {
      console.log(updatedBlog)
      const returnedBlog = await blogService.updateBlog({
        ...updatedBlog,
        likes: updatedBlog.likes + 1,
      });  
      
      returnedBlog.user = {
        username: user.username,
        name: user.name,
        id: user.id,
      };

      setUpdatedBlog(returnedBlog);

      setUser({
        ...user,
      });
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {updatedBlog.title} {updatedBlog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
        {visible ? (
          <div>
            <a href={updatedBlog.url}>{updatedBlog.url}</a>
            <br />
            {updatedBlog.likes}
            <button onClick={addLike}>like</button>
            <br />
            {updatedBlog.user.name}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
