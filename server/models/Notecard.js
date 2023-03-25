const { Schema, Types } = require("mongoose");


const notecardSchema = new Schema({
 
    notecardId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  //   authors: [
  //     {
  //       type: String,
  //     },
  //   ],
  //   description: {
  //     type: String,
  //     required: true,
  //   },

  //   bookId: {
  //     type: String,
  //     required: true,
  //   },
  //   image: {
  //     type: String,
  //   },
  //   link: {
  //     type: String,
  //   },
  //   title: {
  //     type: String,
  //     required: true,
  //   },
});

module.exports = notecardSchema;

