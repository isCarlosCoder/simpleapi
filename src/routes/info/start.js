const { clroute } = require('..')

clroute.create({
  path: '/',
  description: 'route description(endpoint info)',
  about: {
    query: '',
    description: 'it is not necessary.'
  },
  callback: async (_req, res) => {
    const jsonResponse = {
      status: 200,
      all: clroute.routesInfo
    }

    res.json(jsonResponse)
  }
})
