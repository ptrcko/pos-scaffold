#!/usr/bin/env node
const commander = require('commander');
const program = new commander.Command();
const path = require("path");

const fs = require('fs');
const inquirer = require('inquirer');
let config =  fs.readFileSync('.yo-rc.json');;
config = JSON.parse(config);

const quesions = [
   {
     type: "input",
     name: "projectPath",
     message: "Where is your project code?",
     default: config.projectPath || process.cwd() // Default to current folder name
   },
   {
     type: "input",
     name: "schmeaFolder",
     message: "Where is the schema folder to read?",
     default: config.schmeaFolder || "app"
   },
   {
     type: "input",
     name: "logicDependencyFolder",
     message: "Where is the logic dependencies to insert into the templates?",
     default: config.logicDependencyFolder || "modules/func"
   },
   {
     type: "input",
     name: "outputLogicFolder",
     message: "Where do you want to output logic specifc to this project?",
     default:  config.outputLogicFolder || "modules/your-module"
   },
   {
     type: "input",
     name: "outputThemeFolder",
     message: "Where do you want to the view files specifc to this project?",
     default: config.outputThemeFolder || "modules/theme"
   },
   {
     type: "input",
     name: "outputTheme",
     message: "Where is the name of your theme folder?",
     default: config.outputTheme || "simple"
   }
 ];

 inquirer.prompt(quesions)
  .then(answers =>{
    if(answers.schmeaFolder === "app"){
      schemaFolderPath = path.join(answers.projectPath, answers.schmeaFolder, "schema");  
      graphqlTablePath = "";
    }else{
      schemaFolderPath = path.join(answers.projectPath, answers.schmeaFolder, "public", "schema");  
      graphqlTablePath = `${answers.schmeaFolder}/`
    }
    answers.schemaFolderPath = schemaFolderPath;
    answers.graphqlTablePath = graphqlTablePath;
    var json = JSON.stringify(answers, null, 2);
    
    fs.writeFileSync(".yo-rc.json",json);
    program
      .name('generate')
      .description('Quickly generate GraphQL, pages & partials and REST API endpoints based on a schema defined in a YML file.')
      .command('crud', 'Generate everything required for CRUD actions based on a Schema YML file or set of files')
      .parse(process.argv);
  })



