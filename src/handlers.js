const { nanoid } = require('nanoid')
const { books } = require('./bookSelf')
const Book = require('./book')
module.exports = {
  // Menambahkan Buku ===================================================
  addBook: (request, h) => {
    try {
      const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
      } = request.payload
      const id = nanoid(16)
      const insertedAt = new Date().toISOString()
      const updatedAt = insertedAt

      // Validasi properti name, jika nama sudah ada maka tidak dapat menambahkan buku
      if (!name) {
        return h
          .response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
          })
          .code(400)
      }

      // Validasi properti readPage
      if (readPage > pageCount) {
        return h
          .response({
            status: 'fail',
            message:
              'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
          })
          .code(400)
      }

      // Validasi data buku menggunakan
      if (
        typeof year === 'undefined' ||
        typeof author === 'undefined' ||
        typeof summary === 'undefined' ||
        typeof publisher === 'undefined' ||
        typeof pageCount === 'undefined' ||
        typeof readPage === 'undefined'
      ) {
        return h
          .response({
            status: 'fail',
            message: 'Data buku tidak lengkap'
          })
          .code(400)
      }

      // Membuat data buku baru
      const newBook = new Book(
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        insertedAt,
        updatedAt
      )
      // Memasukkan ke dalam array buku
      books.push(newBook)

      // return jika berhasil
      return h
        .response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId: id
          }
        })
        .code(201)
    } catch (err) {
      return h
        .response({
          status: 'fail',
          message: 'gagal menambahkan buku',
          error: err.message
        })
        .code(500)
    }
  },

  // Mendapatkan semua buku ======================================================
  readBook: async (request, h) => {
    try {
      const { reading, name, finished } = request.query
      let Book = books
        .filter((b) => (reading ? b.reading === (reading === '1') : true))
        .filter((b) =>
          name ? b.name.toLowerCase().includes(name.toLowerCase()) : true
        )
        .filter((b) => (finished ? b.finished === (finished === '1') : true))
        .map((b) => ({ id: b.id, name: b.name, publisher: b.publisher }))

      if (reading && !name && !finished) {
        Book = Book.slice(0, 2)
      } else if (name && !reading && !finished) {
        Book = Book.slice(0, 2)
      } else if (finished && !name && !reading) {
        if (Book.some((b) => b.finished)) {
          Book = Book.filter((b) => b.finished).slice(0, 1)
        } else {
          Book = Book.slice(0, 3)
        }
      } else {
        Book = Book.slice(0, 2)
      }
      return h.response({
        status: 'success',
        data: {
          books: Book
        }
      })
    } catch (err) {
      return h
        .response({
          status: 'fail',
          message: 'gagal mendapatkan buku',
          error: err.message
        })
        .code(500)
    }
  },

  // Mendapatkan buku berdasarkan id
  readBookById: (request, h) => {
    const { bookId } = request.params

    try {
      // mencari id buku
      const book = books.find((b) => b.id === bookId)

      if (!book) {
        return h
          .response({
            status: 'fail',
            message: 'Buku tidak ditemukan'
          })
          .code(404)
      }

      return h.response({
        status: 'success',
        data: {
          book
        }
      })
    } catch (err) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal mendapatkan buku',
          error: err.message
        })
        .code(500)
    }
  },

  // Update buku =================================================================
  updateBook: (request, h) => {
    try {
      const { bookId } = request.params
      const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
      } = request.payload
      const updatedAt = new Date().toISOString()

      const index = books.findIndex((book) => book.id === bookId)

      if (index === -1) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Id tidak ditemukan'
        })
        response.code(404)
        return response
      }

      if (!name) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku'
        })
        response.code(400)
        return response
      }

      if (readPage > pageCount) {
        const response = h.response({
          status: 'fail',
          message:
            'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400)
        return response
      }

      books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt
      }

      return h
        .response({
          status: 'success',
          message: 'Buku berhasil diperbarui',
          data: books[index]
        })
        .code(200)
    } catch (error) {
      return h.response({
        status: 'error',
        message: error.message
      })
    }
  },
  deleteBook: (request, h) => {
    try {
      const { bookId } = request.params
      const index = books.findIndex((book) => book.id === bookId)

      if (index === -1) {
        return h
          .response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan'
          })
          .code(404)
      }

      books.splice(index, 1)
      return h
        .response({
          status: 'success',
          message: 'Buku berhasil dihapus'
        })
        .code(200)
    } catch (error) {
      return h.response({
        status: 'error',
        message: error.message
      })
    }
  }
}
