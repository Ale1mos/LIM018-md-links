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

describe('find link',()=>{
  it('should return find link', () => {
    const linksArray = pathAndFile.links('C:/Users/L-63/md-links/prueba/archivo.md');
    // const path = 'C:/Users/L-63/md-links/prueba/archivo.md';
    const response = [
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',     
        text: 'Array.prototype.filter() - MDN',
        file: 'C:/Users/L-63/md-links/prueba/archivo.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce',     
        text: 'Array.prototype.reduce() - MDN',
        file: 'C:/Users/L-63/md-links/prueba/archivo.md'
      }
    ]
    // expect(links(path)).toEqual(response)
    expect(linksArray).toEqual(response)
  });
})

describe('stats',()=>{
  it('should return stats', () => {
    // const links = pathAndFile.links('C:/Users/L-63/md-links/prueba/archivo.md');

    const response = [
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce',
        text: 'Array.prototype.reduce() - MDN',
        file: 'C:/Users/L-63/md-links/prueba/archivo.md'
      }
    ]

    const result = {totalLinks:1, uniqueLinks:1};
    
    expect(stats(response)).toEqual(result)
    
    // expect(links).toBe(response)
  });
})

describe('brokenstats',()=>{
  it('should return brokenstats', () => {
    
    const response = [
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce',
        text: 'Array.prototype.reduce() - MDN',
        file: 'C:/Users/L-63/md-links/prueba/archivo.md'
      }
    ]

    const resultStat = stats(response);
    const resultBroken = {totalLinks:1, uniqueLinks:1, brokenLinks:0};
    
    expect(brokenStats(resultStat,response)).toEqual(resultBroken)
    
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
