const mongoose = require('mongoose');
const quesSchema = new mongoose.Schema({
    query:{
        type:String,
        required:true,
    },
    topic:{
        type:String,
        required:true
    },
    tags:[{
        type:String,
        required:true,
    }]
},{
    timestamps:true,
})

const Question = mongoose.model('Question',quesSchema);
module.exports = Question;