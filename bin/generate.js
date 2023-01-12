#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();

program
  .name('generate')
  .description('Quickly generate GraphQL, pages & partials and REST API endpoints based on a schema defined in a YML file.')
  .command('crud', 'Generate everything required for CRUD actions based on a Schema YML file or set of files')
  .parse(process.argv);

