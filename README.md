# simple api

just a testing API where I look for other ways to create routes
using expressjs.

in this project I am using only JSON returns, using a class to create
routes and automatically configure information during creation.

## codes preview

small snippets of codes for preview

### route class

```javascript
class MakeRoute {
  routesInfo = []

  /**
   * create a new route
   *
   * @param      {RouterCL}  settings  the route settings
   */
  create(settings) {
    router.get(settings.path, settings.callback)

    const obj = {
      path: settings.path,
      description: settings.description,
      query: {
        ...settings.about
      }
    }

    this.routesInfo.push(obj)

    console.info(`Route "${settings.path}" loaded!`)
  }

  get getInfo() {
    return this.routesInfo
  }
}

const clroute = new MakeRoute()

module.exports = {
  clroute
}
```

- the class receives a `settings` parameter containing the `path` and `callback` of the route, in addition to containing information about it

#### route class types

```javascript
/**
 * @typedef    {Object} RouteInfo
 * 
 * @property   {string} query         query params
 * @property   {string} description   route description
 */

/**
 * @typedef     {Object}            RouterCL
 * 
 * @property    {string}            path
 * @property    {string}            description
 * @property    {RouteInfo}         about
 * @property    {(request: Request, response: Response) => void}   callback
 */
```

### require files

I use an approach that I don't know if it's the best to start independent files
which contains the route definitions.

```javascript
const readdir = (dirpath) => {
  const dirs = readdirSync(dirpath)

  dirs.forEach(fileOrFolder => {
    if (fileOrFolder.endsWith('.js')) {
      require(join(dirpath, fileOrFolder))
    } else {
      readdir(join(dirpath, fileOrFolder))
    }
  })
}

readdir(__dirname)
```

### route definition

example of the main route "/"

```javascript
const { clroute } = require('..')

clroute.create({
  path: '/',
  description: 'route description (endpoint info)',
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
```

#### return from default route

```json
{
  "status": 200,
  "all": [
    {
      "path":"/",
      "query":"",
      "description":"it is not necessary."
    }
  ]
}
```
