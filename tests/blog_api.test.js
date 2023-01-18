const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper.js')
const app = require('../app')
const Blog = require('../models/postaus')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])  
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])  
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs are right counted and JSON-typed', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
  const typedJSON = {'content-type': 'application/json'};  
  expect(response.type).toContain(typedJSON['content-type'])
})

test('Id is founded', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined();
})

test('New blog can be added to database', async () => {
  
  const newBlog = {
    title: 'New Blog Title',
    author: 'Jan Keronen',
    url: 'newUrl',
    likes: 100
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedBlogs = await helper.blogsInDb()
  expect(updatedBlogs).toHaveLength(helper.initialBlogs.length +1)

  // löytyykö
  const blogsTitles = updatedBlogs.map(blog => blog.title)
  expect(blogsTitles).toContain('New Blog Title')
})

afterAll(() => {
  mongoose.connection.close()
})