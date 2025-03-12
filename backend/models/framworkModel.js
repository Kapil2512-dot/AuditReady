const mongoose = require('mongoose')
const frameworkSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    about:{
        type:String,
        required:true,
        unique:true,
    },
    controls:{
        type:Number,
        required:true,
    },
})
const Framework = mongoose.model("Framework",frameworkSchema)
module.exports = Framework;