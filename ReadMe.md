# Introduction

This scaffolder is built based on the scaffolder in the [platformOS marketplace template](https://github.com/mdyd-dev/product-marketplace-template) which was built by [Paweł ](https://github.com/pavelloz).

It is a standalone repository that can be used in any project.

# Installation
Download the repository and copy it to your project folder.
It should look something like
```
-ProjectName
--app
--modules
--scaffold
```
If you don't want to include it in your project folder, you can update the basePath for `config.js` to specify the output location.

Install the dependencies
`npm install`

# Configuration
The following options are available in the `config.js` file
```
config.basePath =  path.join(__dirname, "./../");
config.defaults = {} 
config.defaults.schemaFolder = 'app';
config.defaults.outputLogicFolder = 'modules/func';
config.defaults.outputThemeFolder = 'modules/theme';
config.defaults.outputTheme = 'simple';
```
These are the defaults that will be called if no property is passed in the command line.
# Usage  
Run `node bin/generate --help` to get the help file
```
Options:
  -h, --help      display help for command

Commands:
  crud            Generate everything required for CRUD actions based on a Schema YML file or set of  files
```

Run `node bin/generate crud --help` to get the help file
```
  --schema-folder <folder>        Looks in the app folder for a schema folder by default. You can     
                                  change this to point to a module folder (e.g. `module/my-module`).  
  --schema <schema>               schema file to read. If not set, all files in the folder will be    
                                  processed
  --output-logic-folder <folder>  Defaults to modules/func. You can change this to point to a another 
                                  folder (e.g. `app` or `module/my-module/public`)
  --output-theme-folder <folder>  Defaults to modules/theme. You can change this to point to a        
                                  another folder (e.g. `app` or `module/my-module`)
  --output-theme-name <theme>     Defaults to simple. You can change this to another theme
  -h, --help                      display help for command
```

# Output
Running the scaffolder will generate

 * Graph Queries for CRUD actions
 * Pages
 * Partials
 * TODO: Rest API Endpoints

 Note: The output is tightly coupled to the implementation of the [platformOS marketplace template](https://github.com/mdyd-dev/product-marketplace-template) and will have some required dependencies.
