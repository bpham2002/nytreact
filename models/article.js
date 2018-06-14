const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: false },
    abstract: String,
    date: { type: Date, default: Date.now },
    url: { type: String, required: true},
    saved: {type: Boolean, default: false}
});

const Article = mongoose.model("article", articleSchema);

module.exports = Article;
