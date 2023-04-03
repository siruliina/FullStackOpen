// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  
  blogs.forEach(blog => {
    likes += blog.likes
  })
  return likes
}

const favoriteBlog = (blogs) => {
  let mostPopular = {}
  let mostLikes = 0

  blogs.forEach(blog => {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes
      mostPopular = blog
    }
  })
  return mostPopular
}

const mostBlogs = (blogs) => {
  const authorCounts = {}
  let maxAuthor = ''
  let maxCount = 0
  
  // Count the number of blogs for each author
  blogs.forEach(blog => {
    const author = blog.author
    authorCounts[author] = (authorCounts[author] || 0) + 1
    
    // Update the max author and count if necessary
    if (authorCounts[author] > maxCount) {
      maxAuthor = author
      maxCount = authorCounts[author]
    }
  })
  
  return (
    {
      author: maxAuthor,
      blogs: maxCount
    }
  )
}

module.exports = {
  dummy, 
  totalLikes, 
  favoriteBlog,
  mostBlogs
}