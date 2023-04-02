const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const plannerItemSchema = new Schema({
  body: {
    type: String,
  },
  dayOfCurrentMonth: {
    type: Number,
    require: true
  },
});

const PlannerItem = model("PlannerItem", plannerItemSchema);

module.exports = PlannerItem;
