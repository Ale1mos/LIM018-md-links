const fs = require('fs');
const path = require('path');
const axios = require('axios');
// console.log(axios)

// VERIFICAMOS SI EXISTE LA RUTA
// const existPath = fs.existsSync('C:/Users/L-63/md-links/test/main.js');
// console.log(existPath);

const existsRoute = (path) => fs.existsSync(path);
// console.log(existsRoute(existsRoute,'C:/Users/L-63/md-links/test/main.js'))

const absoluteRoute = (route) => path.isAbsolute(route) ? route : path.resolve(route);
// console.log(absoluteRoute('main.js'))

// console.log(existRoute('C:/User/L-63/md-links/test/main.js'));
const extensionPath = (route) => (path.extname(route) === '.md');

const isDirectory = (route) => fs.statSync(route).isDirectory();

const docsinDirectory = (route) => fs.readdirSync(route, 'utf-8')

const readDirectory = (route) => {
  if(!isDirectory(route)){
    return [route];
  }
  const directoryRead = docsinDirectory(route);
  const totalFiles = directoryRead.map(element =>{
    const completePaht = path.join(route,element);
    return isDirectory(completePaht)? readDirectory(completePaht): completePaht;
  });
  const mdFiles = totalFiles.flat().filter(file=>extensionPath(file));
  return mdFiles;
};

// console.log(readDirectory('C:/Users/L-63/LIM018-md-links/prueba'));
// console.log(readDirectory('C:/Users/L-63/LIM018-md-links/prueba/archivo.md'));
// console.log("readDirectory",readDirectory('C:/Users/L-63/LIM018-md-links/test'));

const readFile = (route) => fs.readFileSync(route, 'utf-8');
// console.log(readFile('C:/Users/L-63/LIM018-md-links/prueba/archivo.md'))

const links = (route) => {
  // console.log("route",route)
  const pattern = /(\[(.*?)\])?\(http(.*?)\)/gm;
  const arrayLinks =[];

  const linksFile = readFile(route).match(pattern);
  // console.log("linksFile",linksFile)
  if(linksFile !== null){
    linksFile.forEach((elem)=>{
      const parentheses = /\(([^)]+)\)/;
      const matchHttp = parentheses.exec(elem);
      const href = matchHttp[1];
      const text = elem.slice(1, elem.indexOf(']'));
      const correctText = text.length > 50 ? text.slice(0, 50) : text;
      // console.log("correctText",correctText)
  
      const file = route;
  
      const link = {
        href,
        text: correctText,
        file
      };
      arrayLinks.push(link);
    })
    return arrayLinks;
    }else{
    return [];
    }
  
  // console.log("prueba",arrayLinks)
}

// console.log("links",links('C:/Users/L-63/LIM018-md-links/prueba/archivo.md'))

// console.log(links('C:/Users/L-63/md-links/archivos-prueba/PRUEBA1.md'))


const validateLinks = (arrayLinks) => {
  return Promise.all(arrayLinks.map((link) =>{
    return axios.get(link.href)

    .then(function(response){
      // console.log("link.href",link.href)
      link.status = response.status;
      link.message = response.statusText;
      return link;
    })

    .catch(function(error){
      link.status = 502;
      link.message = "fail";
      return link;
    })
  }))
}

// validateLinks(links('C:/Users/L-63/LIM018-md-links/prueba/archivo.md')).then((response)=> console.log("validateLinks_response",response))

// const stats = (arrObj) => {
//   const totalLinks = arrObj.length;
//   const uniqueLinks = new Set (arrObj.map(link=>link.href)).size;

//   return{
//     totalLinks,
//     uniqueLinks
//   };

  // result = {};
  // const totalLinks = arrObj.map(a=>a.href);
  // const uniqueLinks = [...new Set(totalLinks)];

  // result.Total = totalLinks.length;
  // result.unique = uniqueLinks.length;
  // return result;
// };

const totalLinks = (arrObj) => {
  const totalLinks = arrObj.length;
  return totalLinks;
    
  // result = {};
  // const totalLinks = arrObj.map(a=>a.href);
  // const uniqueLinks = [...new Set(totalLinks)];

  // result.Total = totalLinks.length;
  // result.unique = uniqueLinks.length;
  // return result;
};

const uniqueLinks = (arrObj) =>{
  const uniqueLinks = new Set (arrObj.map(link=>link.href)).size;
  return uniqueLinks
};
// console.log(stats())

// console.log("stats",stats([
//   {
//     href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',     
//     text: 'Array.prototype.filter() - MDN',
//     file: 'C:/Users/L-63/md-links/prueba/archivo.md',
//     status: 200,
//     message: 'OK'
//   },
//   {
//     href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',     
//     text: 'Array.prototype.filter() - MDN',
//     file: 'C:/Users/L-63/md-links/prueba/archivo.md',
//     status: 200,
//     message: 'OK'
//   }
// ]))

const brokenLinks = (stat,arrObj) => {
  const broken = arrObj.filter(link => link.ok === 'Fail');
  stat.brokenLinks = broken.length;
  // console.log("stat",stat.Broken)
  return stat;
  // brokenLink = broken.length;
  // return brokenLink;
  // return broken.length;
  
};
// por que en la terminal figura 0 archivos rotos?

// console.log("brokenStats",brokenStats(stats([
//   {
//     href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduc', 
//     text: 'Array.prototype.reduce() - MDN',
//     file: 'C:/Users/L-63/md-links/prueba/archivo.md',
//     status: 502,
//     message: 'fail'
//   }
// ]),[
//   {
//     href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduc', 
//     text: 'Array.prototype.reduce() - MDN',
//     file: 'C:/Users/L-63/md-links/prueba/archivo.md',
//     status: 502,
//     message: 'fail'
//   }
// ]))

module.exports ={
  existsRoute,
  extensionPath,
  absoluteRoute,
  readFile,
  links,
  readDirectory,
  validateLinks,
  // stats,
  totalLinks,
  uniqueLinks,
  brokenLinks
}
















// links('C:/Users/L-63/md-links/prueba/archivo.md')

// const fileInfomation = (enteredFile) => {
//   const regularExpretion = /\[([^\[]+)\](\(https:.*\))/gm;
//   const readFile = fs.readFileSync(enteredFile, 'utf-8');
//   const arrayOfLinks = [];

//   const foundLinks = readFile.match(regularExpretion);

//   if (foundLinks) {
//     foundLinks.forEach((link) => {
//       const separator = link.indexOf(']'); // encuentra el 1er elem q coincida
//       // lo que tiene que estar en mi objeto
//       const href = link.slice(separator + 2, link.length - 1);
//       const text = link.slice(1, separator); // hasta el txtRef sin incluirme el 
//       const file = enteredFile;

//       arrayOfLinks.push({ href, text, file });
//     });
//   };
//   return arrayOfLinks;
// }
// console.log(fileInfomation('archivos-prueba/PRUEBA1.md'));








