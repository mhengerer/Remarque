const { Schema, model } = require("mongoose");

const GridItem = require("./GridItem");

const spreadSchema = new Schema({
  monday: {
    type: Date,
    required: true,
  },
  sunday: {
    type: Date,
    required: true,
  },
  plannerItems: [
    {
      type: String,
    },
  ],
  gridItems: [GridItem.schema],
});

const Spread = model("Spread", spreadSchema);

module.exports = Spread;
