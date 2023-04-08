const Hapi = require('@hapi/hapi')
const { routes } = require('./routes.js')

const init = async () => {
  const server = Hapi.server({
    port: 2000,
    host: 'localhost'
  })

  server.route(routes)

  await server.start()
  console.log(`server berjalan pada ${server.info.uri}`)
}

init()
