#!/usr/bin/env node

const yeoman = require("yeoman-environment");
const env = yeoman.createEnv();
const program = require("commander");
const path = require("path");
const chalk = require("chalk");

const runYeoman = (modelName, attributes) => {
  const generatorName = 'crud'
  const generatorPath = path.join(__dirname, "..", "generators", generatorName);
  
  env.register(generatorPath, generatorName);
  env.run(`crud ${modelName} ${attributes.join(' ')}`).then((e)=> {
    console.log(e);
  });

}

const description = `Generate model and endpoints create, read, update, deletes.
  It produces model schema, graphql, pages, commands, html partials, translations.
  Generated endpoint is ready to access via https://<instance_url>/<model_name>s

  Example:

    generate resource car car_model:string color:string year:integer`;
program
  .description(description)
  .arguments('<model_name> <attributes...>')
  .usage("<model_name> <attribute_name:type_attribute...>")
  .action(function (modelName, attributes) {
    runYeoman(modelName, attributes);
  });

program.parse(process.argv);

if (!program.args.length) program.help();
