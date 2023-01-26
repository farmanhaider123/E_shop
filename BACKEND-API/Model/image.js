const mangoose = require("mongoose");
const imageSchema = new mangoose.Schema({
  email:{type: String,unique: true},
  imageURL: { type: String, required: true,unique: true },
  created_at: { type: Date, default: Date.now },
});
module.exports = mangoose.model("images", imageSchema);