const { Schema, model } = require("mongoose");

const notecardSchema = new Schema({
  // Header of the notecard
  title: {
    type: String,
    default: "Note",
    trim: true,
  },
  // Body text of the notecard
  body: [
    {
      type: String,
    },
  ],
  // i: Grid item property for referencing
  // Coordinates of the item on the grid
  // x: Columns
  // y: Pixels
  // Size of the notecard item, for use with react-grid-layout
  // w: Columns
  // h: Pixels
  i: {
    type: String,
    required: true,
  },
  x: {
    type: Number,
  },
  y: {
    type: Number,
  },
  w: {
    type: Number,
  },
  h: {
    type: Number,
  },
});

const Notecard = model("Notecard", notecardSchema);

module.exports = Notecard;
