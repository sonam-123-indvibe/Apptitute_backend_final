const mongoose = require("mongoose")


const resultSchema = new mongoose.Schema({
        Name: String,
        userId: String,
        Email:String,
        Score:Number,
})

const Results = mongoose.model("result",resultSchema)

module.exports = Results;