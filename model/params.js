//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParamsSchema = new Schema({
    param: String,
    input: String
});

module.exports = mongoose.model('Param', ParamsSchema);