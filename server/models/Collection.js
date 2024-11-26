const { Schema, model } = require("mongoose");

const PlannerItem = require("./PlannerItem");
// const GridItem = require("./GridItem");
// const Layout = require("./Layout");

const collectionSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  plannerItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "PlannerItem",
      required: true,
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

collectionSchema.index({
  userId: Schema.Types.ObjectId,
});

const Collection = model("Collection", collectionSchema);

module.exports = Collection;
