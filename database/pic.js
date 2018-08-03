const mongoose = require("mongoose");

const pic = new mongoose.Schema({
    img: String,
    liu: String,
},{versionKey:false})

module.exports = mongoose.model("pic",pic,"pic")