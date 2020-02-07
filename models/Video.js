var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var VideoSchema = new Schema({
  title: {
    type: String,
    required: true
  }
  /*link: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }*/
});

var Video = mongoose.model("Video", VideoSchema);

module.exports = Video;