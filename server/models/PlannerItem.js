const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const plannerItemSchema = new Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  scheduled: {
    type: Date,
  },
  status: {
    type: String,
  },
  collections: [
    {
      type: Schema.Types.ObjectId,
      ref: "GridItem",
      required: true,
    },
  ],
});

const PlannerItem = model("PlannerItem", plannerItemSchema);

module.exports = PlannerItem;
