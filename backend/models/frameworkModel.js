const mongoose = require('mongoose');

const frameworkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
        unique: true,
    },
    controls: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Control"
    }],
    controlsCount: { 
        type: Number, 
        default: 0  // ✅ Ensures new frameworks start with 0 controls
    }
});

const Framework = mongoose.model("Framework", frameworkSchema);
module.exports = Framework;
