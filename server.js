/**
 * this is the strting file
 */
const express = require('express');
const mongoose = require("mongoose");
const server_config = require('./configs/server_config');
const app = express();
const db_config = require('./configs/db_config')
const userModel = require("./modules/user.model")
const bcrypt = require('bcrypt')
app.use(express.json())
/**
 * creating an admin user at the strating of thr aaplication
 * if not already pressent
 */
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("erroer", () => {
    console.log("While connecting to MongoDb")
})
db.once("open", () => {
    console.log("connect to MongoDb")
    init()
})

async function init() {
    try {
        const user = await userModel.findOne({ userId: "admin" });
        if (user) {
            console.log("Admin is already presented")
            return;
        }
    } catch (err) {
        console.log("Error while reading the data", err);
    }

    try {
        let user = await userModel.create({
            name: "Asif",
            userId: "admin",
            email: "abcdef@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("welcome1", 8)
        })
        console.log("admin created", user)

    } catch (err) {
        console.log("Error while creating a eroor", err);
    }

}
//stich the route to the server
require("./routers/auth.routes")(app)




//strating the server
app.listen(server_config.PORT, () => {
    console.log("server has stated", server_config.PORT)
})