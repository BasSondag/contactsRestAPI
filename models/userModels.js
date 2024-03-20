const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please add an User Name"]
    },
    email: {
        type: String,
        required: [true, "Please add an User Email Address"],
        unique: [true, "Email address is already taken"]
    },
    password: {
        type: String,
        required: [true, " Password is required"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);