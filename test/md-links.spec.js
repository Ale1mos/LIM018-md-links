// const pathAndFile = require ("../path_and_file.js")
// const mdLinks = require('../');
// const {
//   links
// } = require ("../path_and_file.js")
const pathAndFile = require ("../path_and_file.js");
// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
describe('exists route',()=>{
  it('should return true', () => {
    const existsRoute = pathAndFile.existsRoute('prueba');
    expect(existsRoute).toBe(true)
  })
  it('should return false', () => {
    const noExistsRoute = pathAndFile.existsRoute('pruba');
    expect(noExistsRoute).toBe(false)
  })
})

describe('absolute route',()=>{
  it('should return absolute route', () => {
    const absoluteRoute = pathAndFile.absoluteRoute('prueba');
    expect(absoluteRoute).toBe('C:\\Users\\L-63\\LIM018-md-links\\prueba')
  });
})

describe('extension path',()=>{
  it('should return extension path', () => {
    const extensionPath = pathAndFile.extensionPath('C:/User/L-63/md-links/test/main.js');
    expect(extensionPath).toBe(false)
  });
})

describe('find links',()=>{
  it('should return find links', () => {
    const linksArray = pathAndFile.links('C:/Users/L-63/LIM018-md-links/prueba/archivo.md');
    // const path = 'C:/Users/L-63/md-links/prueba/archivo.md';
    const response = [
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',     
        text: 'Array.prototype.filter() - MDN',
        file: 'C:/Users/L-63/LIM018-md-links/prueba/archivo.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce',     
        text: 'Array.prototype.reduce() - MDN',
        file: 'C:/Users/L-63/LIM018-md-links/prueba/archivo.md'
      }
    ]
    // expect(links(path)).toEqual(response)
    expect(linksArray).toEqual(response)
  });
})

describe('totalLinks',()=>{
  it('should return totalLinks', () => {
    // const links = pathAndFile.links('C:/Users/L-63/md-links/prueba/archivo.md');
    const response = [
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce',
        text: 'Array.prototype.reduce() - MDN',
        file: 'C:/Users/L-63/md-links/prueba/archivo.md'
      }
    ]
  
    expect(pathAndFile.totalLinks(response)).toEqual(1)
    // expect(links).toBe(response)
  });
})

describe('brokenLinks',()=>{
  it('should return brokenLinks', () => {
    
    const response = [
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduc', 
        text: 'Array.prototype.reduce() - MDN',
        file: 'C:/Users/L-63/md-links/prueba/archivo.md',
        status: 502,
        message: 'fail'
      }
    ]

    expect(pathAndFile.brokenLinks(response)).toEqual(1)
    
  });
})
// describe('validates links', () => { 
//   it('should return validates links', () =>{
//     const validateLinks = pathAndFile.validateLinks(links('C:/Users/L-63/md-links/prueba/archivo.md'))
//     expect(validateLinks).toBe()
//   })
//  })

// describe("exists route",()=>{
//   it("rout is true",()=>{
//     const existsRoute =
//   }
// })
