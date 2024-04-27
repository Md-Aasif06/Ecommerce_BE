const mongoose = require('mongoose')
/**
 * name
 * userId
 * pssword
 * email
 * userType
 * 
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requries: true
    },
    userId: {
        type: String,
        requried: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        minLength: 10,
        lowercase: true,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        required: true,
        default: "CUSTOMER",
        enum: ["CUSTOMER", "ADMIN"]
    }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model("user", userSchema)