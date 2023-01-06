# Introduction

This scaffolder is built based on the scaffolder in the [platformOS marketplace template](https://github.com/mdyd-dev/product-marketplace-template) which was built by [Paweł ](https://github.com/pavelloz).

It is a standalone repository that can be used in any project.

I have updated all dependencies to the latest versions. 
Running `npm audit` should show

> found 0 vulnerabilities

# Output
Running the scaffolder will generate

 * Schema
 * Graph Queries for CRUD actions
 * Pages
 * Partials
 * Rest API Endpoints

 Note: The output is tightly coupled to the implementation of the [platformOS marketplace template](https://github.com/mdyd-dev/product-marketplace-template) and will have some required dependencies.

# Instructions
Install the dependencies
`npm install`

To run the script, type
`npm run generate`

## Commands
`resource` - generate model and endpoints for create, read, update and delete
`rest-api` - generate rest api endpoints

## Example
Let's generate the required files for a car
`npm run generate resource car car_table:string color:string year:integer`

Let's generate the required files for a blog
`npm run generate resource blog blog_title:string status:string sort_order:integer`

Let's generate the required files for a team
`npm run generate resource team employee_name:string employee_role:string is_enabled:boolean`

