#!/usr/bin/env node

const program = require('commander')
const { prompt } = require('inquirer')

const { addContact, getContact } = require('./logic')

const questions = [
  {
    type: 'input',
    name: 'firstName',
    message: 'Enter first name...'
  },
  {
    type: 'input',
    name: 'lastName',
    message: 'Enter last name...'
  },
  {
    type: 'input',
    name: 'phone',
    message: 'Enter phone number...'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter email address...'
  },
]

program
  .version('0.0.1')
  .description('Contact management from the cli')

// program
//   .command('addContact <firstName> <lastName> <phone> <email>')
//   .alias('add')
//   .description('Add a contact')
//   .action((firstName, lastName, phone, email) => {
//     addContact({ firstName, lastName, phone, email })
//   })

program
  .command('addContact <firstName> <lastName> <phone> <email>')
  .alias('add')
  .description('Add a contact')
  .action(() => {
    prompt(questions).then(answers => {
      addContact(answers)
    })
  })

program
  .command('getContact <name>')
  .alias('get')
  .description('Get a contact')
  .action(name => getContact(name))

program.parse(process.argv)
