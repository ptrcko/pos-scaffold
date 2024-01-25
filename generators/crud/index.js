const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const pluralize = require('pluralize');
const fs = require('fs');
const yaml = require('js-yaml');
const startCase = require('lodash.startcase');
let config =  fs.readFileSync('.yo-rc.json');;
config = JSON.parse(config);
console.log(config);


const readYml = (schema) =>{

  const filePath = `${config.schemaFolderPath}\\${schema}.yml`
  try {
    const data = fs.readFileSync(filePath, 'utf8');

    try{
      const properties = yaml.loadAll(data);
      return properties[0].properties;
    }catch (err){
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  }
}


module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.options = config;

    const properties = readYml(this.schema, this.options.schemaFolder)
    const attributes = properties.map((attr) => {
      return {
        name: attr.name,
        nameHuman: startCase(attr.name),
        type: attr.type,
      };
    });
    
    const options = this.options;
    this.options.outputLogicFolderLocation = this.options.outputLogicFolder
    this.options.outputThemeFolderLocation = this.options.outputThemeFolder
    if (options.schmea = "app"){
      const optionalPublicFolder = "/public"
      this.options.outputLogicFolderLocation += optionalPublicFolder
      this.options.outputThemeFolderLocation += optionalPublicFolder
    }
    this.props = {
      modelName: this.options.schema,
      modelNamePlural: pluralize(this.options.schema),
      attributes: attributes,
      options: options,
      graphqlArgumentMap: {
        string: "String",
        text: "String",
        integer: "Int",
        boolean: "Boolean",
        float: "Float",
        date: "String",
        datetime: "String",
        array: "[String]",
        upload: "String"
      },
      graphqlArgumentValueMap: {
        string: "value",
        text: "value",
        integer: "value_int",
        boolean: "value_boolean",
        float: "value_float",
        date: "value",
        datetime: "value",
        array: "value_array",
        upload: "value"
      },
      graphqlPropertyMap: {
        string: "property",
        text: "property",
        integer: "property_int",
        boolean: "property_boolean",
        float: "property_float",
        date: "property",
        datetime: "property",
        array: "property_array",
        upload: "property_upload"
      },
      formFieldTypeMap: {
        string: "text",
        text: "date",
        integer: "number",
        boolean: "text",
        float: "text",
        date: "text",
        datetime: "text",
        array: "text",
        upload: "text"
      },
      liquidTagMap: {
        integer: ' | times: 1',   
      }
    };
  }

  writing() {
    try{
      this.fs.copyTpl(
        this.templatePath('./graphql/*.graphql'),
        this.destinationPath(`${basePath}/${this.options.outputLogicFolderLocation}/graphql/${this.props.modelNamePlural}/`),
        this.props
      )
      this.fs.copyTpl(
        this.templatePath('./views/partials/lib/queries/model'),
        this.destinationPath(`${basePath}/${this.options.outputLogicFolderLocation}/views/partials/queries/${this.props.modelNamePlural}`),
        this.props
      )
      this.fs.copyTpl(
        this.templatePath('./views/partials/lib/commands/model'),
        this.destinationPath(`${basePath}/${this.options.outputLogicFolderLocation}/views/partials/commands/${this.props.modelNamePlural}`),
        this.props
      )
      this.fs.copyTpl(
        this.templatePath('./views/pages/model'),
        this.destinationPath(`${basePath}/${this.options.outputThemeFolderLocation}/views/pages/${this.props.modelNamePlural}`),
        this.props
      )
      this.fs.copyTpl(
        this.templatePath('./views/partials/theme/simple/model'),
        this.destinationPath(`${basePath}/${this.options.outputThemeFolderLocation}/views/partials/${this.options.outputTheme}/${this.props.modelNamePlural}`),
        this.props
      )
      this.fs.copyTpl(
        this.templatePath('./translations/model.yml'),
        this.destinationPath(`${basePath}/${this.options.outputThemeFolderLocation}/translations/${this.options.outputTheme}/${this.props.modelNamePlural}.yml`),
        this.props
      )
    } catch (e) {
      console.error(e);
    }
  }

  end() {
    console.log(chalk.green('CRUD generated'));
  }
};
