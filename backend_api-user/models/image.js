const mangoose = require("mongoose");
const imageSchema = new mangoose.Schema({
  imageURL: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});
module.exports = mangoose.model("images", imageSchema);