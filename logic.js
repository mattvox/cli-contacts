const mongoose = require('mongoose')
const assert = require('assert')

mongoose.Promise = global.Promise

const db = mongoose.connect('mongodb://localhost:27017/cli-contacts')

function toLower(value) {
  return value.toLowerCase()
}

const contactSchema = mongoose.Schema({
  firstName: { type: String, set: toLower },
  lastName: { type: String, set: toLower },
  phone: { type: String, set: toLower },
  email: { type: String, set: toLower },
})

const Contact = mongoose.model('Contact', contactSchema)

const addContact = (contact) => {
  Contact.create(contact, (err) => {
    assert.equal(null, err)
    console.info('New contact added')
    mongoose.disconnect()
  })
}

const getContact = (name) => {
  const search = new RegExp(name, 'i')

  Contact.find({ $or: [{ firstName: search }, { lastName: search }] })
    .exec((err, contact) => {
      assert.equal(null, err)
      console.info(contact)
      console.info(`${contact.length} matches`)
      mongoose.disconnect()
    })
}

module.exports = { addContact, getContact }
