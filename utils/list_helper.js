var _ = require('lodash');

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
  let tykkaukset= 0;
  const likes = (biggest, blog) => {
     
    if(blog.likes>tykkaukset) {
      biggest=blog
      tykkaukset=blog.likes
      
    }
    return biggest
  //return blogs.filter(blog => blog.likes === biggest);   
  }
return blogs.reduce(likes, 0)
    
}

const mostBlogs = (blogs) => {

const countByAuthor = _.countBy(blogs, 'author' )
const most = _.max(_.values(countByAuthor))
const author = _.findKey(countByAuthor, (o) => {
  return o=== most
})

return { author: author, blogs: most }
}

const mostLikes = (blogs) => {

  const groupByAuthor = _.groupBy(blogs, 'author' )
  console.log(groupByAuthor)
  const mapByAuthorAndLikes = _.mapValues(groupByAuthor => _.sumBy(groupByAuthor, 'likes') )
  console.log(mapByAuthorAndLikes)
  const countByLikes = _.forEach(_.reduce(countByAuthor, function(allLikes,blog) {
    return allLikes + blog.likes
  },{}))
  console.log(countByLikes)
  const most = _.max(_.values(countByLikes))
  console.log(most)
  const author = _.findKey(countByAuthor, (o) => {
    return o=== most
  })

  return { author: author, likes: most }

}
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }
