const mongoose = require("mongoose")

const writecontent = new mongoose.Schema({
    author: String,
    title: {
        type: String,
        index: 1
    },
    content: String,
}, {versionKey: false}
)

module.exports = mongoose.model("writecontent",writecontent)