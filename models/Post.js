const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },

    likes:{
        type:Number,
        default:0
    },

    comments:[
        {
            text:String,
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ]

},{
    timestamps:true
});

module.exports =
mongoose.model("Post", PostSchema);