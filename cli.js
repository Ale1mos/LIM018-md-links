#!/usr/bin/env node
const options = process.argv;
// const chalk = require("chalk")
const mdLinks = require("./index.js");
const isvalidate = options.includes("--validate")
const isStats = options.includes("--stats");
const {totalLinks,uniqueLinks,brokenLinks} = require('./path_and_file.js')

const pathArg = options.filter((x) => !["--stats", "--validate"].includes(x))[2];

mdLinks(pathArg,{stats:isStats,validate:isvalidate})
  .then((arrayFiles)=>{
    if(isvalidate && isStats){
      console.log(`
      VALIDATE AND STATS
      Total Links: ${(totalLinks(a))};
      Unique Links: ${uniqueLinks(a)};
      Broken Links: ${brokenLinks(a)};
      `);
    }else if(!isvalidate && isStats){
      console.log(`
      VALIDATE AND STATS
      Total Links: ${(totalLinks(a))};
      Unique Links: ${uniqueLinks(a)};
      `);
    }else{
      arrayFiles.forEach(element => {
        if(!isvalidate && !isStats){
          console.log(`
          INFO LINKS
          href:${(element.href)}
          text:${(element.text)}
          file:${(element.file)}
          `)
        }else{
          console.log(`
          INFO LINKS
          ${(element.href)}
          ${(element.text)}
          ${(element.file)}
          ${
            element.message === "OK"
              ? (element.message)
              : (element.message)
          }
          ${(element.status)}
          `)
        }
      });  
    }
  })
  .catch((e)=> console.log(e))