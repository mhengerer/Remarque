const { Schema, model } = require("mongoose");
const notecardSchema = require("./Notecard")

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const spreadSchema = new Schema({
  notecards: [
   notecardSchema
  ],
    plannerText: {
    type: String,
    required: true,
  },

//   bookId: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//   },
//   link: {
//     type: String,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
});


const Spread = model('spread',spreadSchema)


module.exports = Spread;
