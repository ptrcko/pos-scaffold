#!/usr/bin/env node
const commander = require('commander');
const program = new commander.Command();
const path = require("path");

const fs = require('fs');
const inquirer = require('inquirer');

const quesions = [
   {
     type: "input",
     name: "projectPath",
     message: "Where is your project code?",
     default: process.cwd() // Default to current folder name
   },
   {
     type: "input",
     name: "schmeaFolder",
     message: "Where is the schema folder to read?",
     default: "app"
   },
   {
     type: "input",
     name: "logicDependencyFolder",
     message: "Where is the logic dependencies to insert into the templates?",
     default: "modules/func"
   },
   {
     type: "input",
     name: "outputLogicFolder",
     message: "Where do you want to output logic specifc to this project?",
     default: "modules/your-module"
   },
   {
     type: "input",
     name: "outputThemeFolder",
     message: "Where do you want to the view files specifc to this project?",
     default: "modules/theme"
   },
   {
     type: "input",
     name: "outputTheme",
     message: "Where is the name of your theme folder?",
     default: "simple"
   }
 ];

 inquirer.prompt(quesions)
  .then(answers =>{
    if(answers.schmeaFolder === "app"){
      schemaFolderPath = path.join(answers.projectPath, answers.schmeaFolder, "schema");  
    }else{
      schemaFolder = path.join(answers.projectPath, answers.schmeaFolder, "public", "schema");  
    }
    answers.schemaFolderPath = schemaFolderPath;
    var json = JSON.stringify(answers, null, 2);
    fs.writeFileSync(".yo-rc.json",json);
    program
      .name('generate')
      .description('Quickly generate GraphQL, pages & partials and REST API endpoints based on a schema defined in a YML file.')
      .command('crud', 'Generate everything required for CRUD actions based on a Schema YML file or set of files')
      .parse(process.argv);
  })



