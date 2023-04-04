const { Schema, model } = require("mongoose");

const PlannerItem = require("./PlannerItem");
const GridItem = require("./GridItem");
const Layout = require("./Layout");

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
      required: true,
    },
  ],
  // Do an include when you want to pull the griditems as well
  gridItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "GridItem",
      required: true,
    },
  ],
  layout: [
    {
      type: Schema.Types.ObjectId,
      ref: "Layout",
      required: true,
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

spreadSchema.index(
  {
    userId: Schema.Types.ObjectId,
  },
  {
    monday: Schema.Types.String,
  }
);

const Spread = model("Spread", spreadSchema);

module.exports = Spread;
