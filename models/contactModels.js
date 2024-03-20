const mongoose = require("mongoose");

const  contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, " Please provide Contact Name"]
    },
    email: {
        type: String,
        required: [true, " Please provide Contact Email Address"]
    },
    phone: {
        type: String,
        required: [true, " Please provide Contact Phone Number"]
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Contact", contactSchema)