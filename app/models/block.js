var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlockSchema = new Schema({
  textBody: String,
  author: String,
  color: String,
  date:{ type: Date, default: Date.now}
})

module.exports = mongoose.model('Block', BlockSchema);