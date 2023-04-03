const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const plannerItemSchema = new Schema({
  body: {
    type: String,
  },
  dayOfCurrentWeek: {
    type: Number,
  },
});

const PlannerItem = model("PlannerItem", plannerItemSchema);

module.exports = PlannerItem;
