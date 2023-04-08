const handlers = require('./handlers')

const routes = [
  {
    path: '/books',
    method: 'POST',
    handler: handlers.addBook
  },
  {
    path: '/books',
    method: 'GET',
    handler: handlers.readBook
  },
  {
    path: '/books/{bookId}',
    method: 'GET',
    handler: handlers.readBookById
  },
  {
    path: '/books/{bookId}',
    method: 'PUT',
    handler: handlers.updateBook
  },
  {
    path: '/books/{bookId}',
    method: 'DELETE',
    handler: handlers.deleteBook
  }
]

module.exports = { routes }
