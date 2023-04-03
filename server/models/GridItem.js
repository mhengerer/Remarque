const { Schema, model } = require("mongoose");

const gridItemSchema = new Schema({
  // Header of the griditem
  title: {
    type: String,
    default: "Note",
    trim: true,
  },
  // Body text of the griditem
  body: [
    {
      type: String,
    },
  ],
  card: {
    type: String,
    required: true,
  },
  // i: Grid item property for referencing
  // Coordinates of the item on the grid
  // x: Columns
  // y: Pixels
  // Size of the griditem item, for use with react-grid-layout
  // w: Columns
  // h: Pixels
  i: {
    type: String,
    required: true,
  },
  // x: {
  //   type: Number,
  // },
  // y: {
  //   type: Number,
  // },
  // w: {
  //   type: Number,
  // },
  // h: {
  //   type: Number,
  // },
});

const GridItem = model("GridItem", gridItemSchema);

module.exports = GridItem;
