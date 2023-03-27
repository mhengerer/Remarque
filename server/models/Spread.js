const { Schema, model } = require("mongoose");

const GridItem = require("./GridItem");

const spreadSchema = new Schema({
  dates: [
    {
      type: Date,
      // The surrounding Monday through Sunday of the current day
      default: Date.now,
    },
  ],
  plannerItems: [
    {
      type: String,
    },
  ],
  gridItems: [GridItem.schema],
});

const Spread = model("Spread", spreadSchema);

module.exports = Spread;
