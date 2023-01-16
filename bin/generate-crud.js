#!/usr/bin/env node

const yeoman = require("yeoman-environment");
const env = yeoman.createEnv();
const commander = require('commander');
const program = new commander.Command();
const path = require("path");
const chalk = require("chalk");
const fs = require('fs');
const yaml = require('js-yaml');
const config = require('../config');
const defaults = config.defaults;
const basePath = config.basePath;



const run = (options) =>{
  const schemaFolder  = options.schemaFolder || defaults.schemaFolder;
  const schema  = options.schema || '';
  const outputLogicFolder = options.outputLogicFolder ||  defaults.outputLogicFolder;
  const outputThemeFolder = options.outputThemeFolder || defaults.outputThemeFolder;
  const outputTheme = options.outputTheme || defaults.outputTheme;

  const opt = {
    schemaFolder: schemaFolder,
    outputLogicFolder: outputLogicFolder,
    outputThemeFolder: outputThemeFolder ,
    outputTheme: outputTheme
  }
  
  /* Check if we have a single schema name 
   */
  if(schema){

    runYeoman(schema, opt);

  }else{
    /* If not, read all the files in the directory
     */
    const schemaFolder = path.join(config.basePath, opt.schemaFolder,"schema");
    console.log(schemaFolder);
    files = fs.readdir(schemaFolder,function(e,files){
      //console.log(files);
      for (var i = 0; i < files.length; i++) {
        console.log(files[i]);
        //Do something
        fileParts = files[i].split(".");
        //console.log({fileParts})
        if(fileParts[1] =="yml"){
          runYeoman(fileParts[0], opt);
        }
      }
    })
  }


}


const runYeoman = (modelName, options) => {
  const generatorName = 'crud'
  const generatorPath = path.join(__dirname, "..", "generators", generatorName);
  
  env.register(generatorPath, generatorName);
  const cmd = `crud ${modelName} ${options.schemaFolder} ${options.outputLogicFolder} ${options.outputThemeFolder} ${options.outputTheme}`;
  env.run(cmd).then((e)=> {
    if(e){
      console.log(e);
    }
  });

}

program
  .option('--schema-folder <folder>', 'Looks in the app folder for a schema folder by default. You can change this to point to a module folder (e.g. `module/my-module`).')
  .option('--schema <schema>', 'schema file to read. If not set, all files in the folder will be processed')
  .option('--output-logic-folder <folder>', 'Defaults to modules/func. You can change this to point to a another folder (e.g. `app` or `module/my-module/public`)')
  .option('--output-theme-folder <folder>', 'Defaults to modules/theme. You can change this to point to a another folder (e.g. `app` or `module/my-module`)')
  .option('--output-theme-name <theme>', 'Defaults to simple. You can change this to another theme')
 

  .action(function(options){
    run(options)
  });

program.parse(process.argv);

/*
if (!program.args.length) program.help();
*/