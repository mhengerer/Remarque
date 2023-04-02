const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const layoutSchema = new Schema({
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
  minw: {
    type: Number,
  },
  maxW: {
    type: Number,
  },
  minH: {
    type: Number,
  },
  maxH: {
    type: Number,
  },
});

const Layout = model("Layout", layoutSchema);

module.exports = Layout;
