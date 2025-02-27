const mongoose = require("mongoose");
const clientSchema =  new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
},{timestamps: true})

const Client = mongoose.model("Client", clientSchema)
module.exports = Client;