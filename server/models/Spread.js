const { Schema, model } = require("mongoose");

const Notecard = require("./Notecard");

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
  gridItems: [Notecard.schema],
});

const Spread = model("Spread", spreadSchema);

module.exports = Spread;
