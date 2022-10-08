// const axios = require('axios');

const{
  existsRoute,
  absoluteRoute,
  readFile,
  links,
  validateLinks,
  readDirectory,
  stats,
  brokenStats
} = require("./path_and_file.js")

const mdLinks = (path, options) => {
  // console.log("valor de opcion",options)
  return new Promise((resolve,reject)=>{
    if(!existsRoute(path)){
      return reject (new Error("La ruta no existe, por favor ingrese una correcta"))
    }
    const absolutePath = absoluteRoute(path);
    const arrayFilesPath = readDirectory(absolutePath);
    const result =[];
    arrayFilesPath.forEach(path => {
      result.push(links(path))
    });
      if(options.validate === true){
        // return result.push(validateLinks(links(path)));
        resolve(validateLinks(result.flat()));
      
      // if(options.stats === true){
      //   return result.push(validateLinks(links(path)).then((result)=>stats(result)))
      // }
      // if(options.stats === true && options.validate === true){
      //   return result.push(validateLinks(links(path)).then((result)=>brokenStats(stats(result),result)))
      // }


      // resolve(links(path));
      // const arrayLinks = links(route);
      // arrayLinks.forEach(link=>{
      //   result.push(link)
        
      // })
// validar los links
      
      }
    // resolve(Promise.all(result))
  })
}

// mdLinks('C:/Users/L-63/LIM018-md-links/prueba',{validate:true})
// .then((result)=>{
//   console.log(result)
// })
// .catch((error)=>{
//   console.log(error)
// })

module.exports = mdLinks;

// const absoluteRoute = absoluteRoute(path)

const mdLinks = (path, options) => {
  // console.log("valor de option", options);
  return new Promise((resolve, reject) => {
    if (!checkPathExists(path)) {
      reject("The path entered is not valid. Please enter a valid Path");
    }

    const absolutePath = convertToAbsolutePath(path);
    // console.log(absolutePath);
    const arrayFilesmd = throughOpenDirectory(absolutePath);
    //console.log(arrayFilesmd);
    const arrayFindLink = [];

    arrayFilesmd.forEach((path) => {
      arrayFindLink.push(findLinks(path));
      //console.log('sin inter', arrayFindLink);
    });

    if (options.validate === true) {
      resolve(getStatusLinks(arrayFindLink.flat()));
    }
    resolve(findLinks(path));
  });
};
