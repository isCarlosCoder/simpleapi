const { Request, Response } = require('express')
const router = require('express').Router()
const { readdirSync } = require('fs')
const { join } = require('path')

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
  router,
  clroute
}

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