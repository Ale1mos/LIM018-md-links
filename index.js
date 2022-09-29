// const axios = require('axios');

const{
  existsRoute,
  absoluteRoute,
  readFile,
  links,
  validateLinks,
  absoluteRoute
} = require("./path_and_file.js")

const mdLinks = (path, options) => {
  if(!existsRoute(path)){
    return reject new Error("La ruta no existe, por favor ingrese una correcta")
  }

  const absoluteRoute = absoluteRoute(path)
}

