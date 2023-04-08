class Book {
  constructor(
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
  ) {
    this.id = id
    if (typeof name !== 'string') {
      throw new TypeError('Name harus berupa string')
    }

    // Pengecekan tipe data pada properti year
    if (typeof year !== 'number') {
      throw new TypeError('Year harus berupa angka')
    }

    // Pengecekan tipe data pada properti author
    if (typeof author !== 'string') {
      throw new TypeError('Author harus berupa string')
    }

    // Pengecekan tipe data pada properti summary
    if (typeof summary !== 'string') {
      throw new TypeError('Summary harus berupa string')
    }

    // Pengecekan tipe data pada properti publisher
    if (typeof publisher !== 'string') {
      throw new TypeError('Publisher harus berupa string')
    }

    // Pengecekan tipe data pada properti pageCount
    if (typeof pageCount !== 'number') {
      throw new TypeError('PageCount harus berupa angka')
    }

    // Pengecekan tipe data pada properti readPage
    if (typeof readPage !== 'number') {
      throw new TypeError('ReadPage harus berupa angka')
    }

    // Pengecekan tipe data pada properti reading
    if (typeof reading !== 'boolean') {
      throw new TypeError('Reading harus berupa boolean')
    }

    this.name = name
    this.year = year
    this.author = author
    this.summary = summary
    this.publisher = publisher
    this.pageCount = pageCount
    this.readPage = readPage
    this.reading = pageCount === readPage
    this.finished = pageCount === readPage
    this.insertedAt = insertedAt
    this.updatedAt = updatedAt
  }
}

module.exports = Book
