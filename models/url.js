const mongoose = require('mongoose');

const urlSchema= new mongoose.Schema(
    {
        shortiD:{
            type: String,
            required: true,
            unique: true
        },
        redirectURL:{
            type: String,
            required: true
        },
        visitHistory:[{timestamp: {type:Number}}],   
        },
        {timestamp:true},  
);

const URL= mongoose.model("url",urlSchema);
module.exports= URL;