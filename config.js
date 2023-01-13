const path = require("path");

var config = {};

/* Assumes the scaffold folder is installed in the same folder as the
 * platformOS App folder
 */
config.basePath =  path.join(__dirname, "./../");

config.defaults = {} 
config.defaults.schemaFolder = 'app';
config.defaults.outputLogicFolder = 'modules/func';
config.defaults.outputThemeFolder = 'modules/theme';
config.defaults.outputTheme = 'simple';


module.exports = config;