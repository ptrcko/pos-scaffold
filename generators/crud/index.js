const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const pluralize = require('pluralize');
const fs = require('fs');
const yaml = require('js-yaml');
const startCase = require('lodash.startcase');


const readYml = (schema,schemaFolder) =>{
  const folderPath = path.join(__dirname, "../..", schemaFolder, 'schema');
  const filePath = `${folderPath}\\${schema}.yml`
  try {
    const data = fs.readFileSync(filePath, 'utf8');

    try{
      const properties = yaml.load(data).properties;

      return properties;
    }catch (err){
      console.error(err);
    }
    properties = yaml.load(data);
  } catch (err) {
    console.error(err);
  }
}


module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('schema', { type: String, required: true });
    this.argument('schemaFolder', { type: String, required: true });
    this.argument('outputLogicFolder', { type: String, required: true });
    this.argument('outputThemeFolder', { type: String, required: true });
    this.argument('outputTheme', { type: String, required: true });

    const properties = readYml(this.options.schema, this.options.schemaFolder)
    const attributes = properties.map((attr) => {
      return {
        name: attr.name,
        nameHuman: startCase(attr.name),
        type: attr.type,
      };
    });

    console.log(this.options.originalOptions, "original")
    const options = this.options;
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
        array: "[String]"
      },
      graphqlArgumentValueMap: {
        string: "value",
        text: "value",
        integer: "value_int",
        boolean: "value_boolean",
        float: "value_float",
        date: "value",
        datetime: "value",
        array: "value_array"
      },
      graphqlPropertyMap: {
        string: "property",
        text: "property",
        integer: "property_int",
        boolean: "property_boolean",
        float: "property_float",
        date: "property",
        datetime: "property",
        array: "property_array"
      }
    };
  }

  writing() {
    try{
     /* 
      this.fs.copyTpl(
        this.templatePath('./schema/model.yml'),
        this.destinationPath(`app/schema/${this.props.modelName}.yml`),
        this.props
      )*/
      this.fs.copyTpl(
        this.templatePath('./graphql/*.graphql'),
        this.destinationPath(`${this.options.outputLogicFolder}/graphql/${this.props.modelNamePlural}/`),
        this.props
      )
      this.fs.copyTpl(
        this.templatePath('./views/partials/lib/queries/model'),
        this.destinationPath(`${this.options.outputLogicFolder}/views/partials/lib/queries/${this.props.modelNamePlural}`),
        this.props
      )
      this.fs.copyTpl(
        this.templatePath('./views/partials/lib/commands/model'),
        this.destinationPath(`${this.options.outputLogicFolder}/views/partials/commands/${this.props.modelNamePlural}`),
        this.props
      )
      this.fs.copyTpl(
        this.templatePath('./views/pages/model'),
        this.destinationPath(`${this.options.outputLogicFolder}/views/pages/${this.props.modelNamePlural}`),
        this.props
      )
      this.fs.copyTpl(
        this.templatePath('./views/partials/theme/simple/model'),
        this.destinationPath(`${this.options.outputThemeFolder}/views/partials/${this.options.outputTheme}/${this.props.modelNamePlural}`),
        this.props
      )
    } catch (e) {
      console.error(e);
    }
  }

  install() {
    // process.chdir(`${this.contextRoot}/${this.props.projectDir}`);
  }

  end() {
    console.log(chalk.green('CRUD generated'));
  }
};
