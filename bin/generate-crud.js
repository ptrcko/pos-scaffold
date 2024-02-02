#!/usr/bin/env node

const yeoman = require("yeoman-environment");
const env = yeoman.createEnv();
const commander = require('commander');
const program = new commander.Command();
const path = require("path");
const fs = require('fs');
let config =  fs.readFileSync('.yo-rc.json');;
config = JSON.parse(config);
const run = () =>{
  files = fs.readdir(config.schemaFolderPath,function(e,files){
    for (var i = 0; i < files.length; i++) {
      fileParts = files[i].split(".");
      if(fileParts[1] =="yml"){
        runYeoman(fileParts[0]);
      }
    }
  })
}


const runYeoman = (modelName) => {
  const generatorName = 'crud'
  const generatorPath = path.join(__dirname, "..", "generators", generatorName);
  env.register(generatorPath, generatorName);
  const cmd = `crud ${modelName}`;
  env.run(cmd).then((e)=> {
    if(e){
      console.log(e);
    }
  });

}

program

  .action(function(options){
    run(options)
  });

program.parse(process.argv);

/*
if (!program.args.length) program.help();
*/