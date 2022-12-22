const dummy = (blogs) => {
    return 1;
  }

const totalLikes = (blogs) => {

    const likes = (sum, item) => {
        return sum+item
    }
    return blogs.reduce(likes, 0)
}

const favoriteBlog = (blogs) => {
  const likes = (biggest, blog) => {
     
    if(blog.likes>biggest) {
      biggest=blog.likes
      
    }
    return blogs.filter(blog => blog.likes === biggest);   
}
return blogs.reduce(likes, 0)
    
}
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }
