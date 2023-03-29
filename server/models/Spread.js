const { Schema, model } = require("mongoose");

const PlannerItem = require('./PlannerItem');
const GridItem = require("./GridItem");

const spreadSchema = new Schema({
  monday: {
    type: String,
    required: true,
  },
  sunday: {
    type: String,
    required: true,
  },
  plannerItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "PlannerItem",
      required: true
    },
  ],
  // Do an include when you want to pull the griditems as well
  gridItems: [
    {
      type: Schema.Types.ObjectId, 
      ref: "GridItem",
      required: true
    }
  ]
});

const Spread = model("Spread", spreadSchema);

module.exports = Spread;
