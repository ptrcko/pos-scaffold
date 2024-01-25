#!/usr/bin/env node

const yeoman = require("yeoman-environment");
const env = yeoman.createEnv();
const commander = require('commander');
const program = new commander.Command();
const path = require("path");
const fs = require('fs');
let config =  fs.readFileSync('.yo-rc.json');;
config = JSON.parse(config);
console.log(config);
const run = () =>{

  files = fs.readdir(config.schemaFolderPath,function(e,files){
    console.log(files);
    for (var i = 0; i < files.length; i++) {
      console.log(files[i]);
      //Do something
      fileParts = files[i].split(".");
      //console.log({fileParts})
      if(fileParts[1] =="yml"){
        runYeoman(fileParts[0], config);
      }
    }
  })
}


const runYeoman = (modelName, options) => {
  const generatorName = 'crud'
  const generatorPath = path.join(__dirname, "..", "generators", generatorName);
  
  env.register(generatorPath, generatorName);
  const cmd = `crud`;
  env.run(cmd).then((e)=> {
    if(e){
      console.log(e);
    }
  });

}

program
  .action(function(){
    run()
  });

program.parse(process.argv);

/*
if (!program.args.length) program.help();
*/