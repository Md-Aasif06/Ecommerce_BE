/**
 * I need to write the controller / logic to register user
 */
const jwt = require('jsonwebtoken')
const secret = require('../configs/auth.config')
const bcrypt = require('bcrypt')
const userModel = require('../modules/user.model')
exports.signup = async (req, res) => {
    /**
     * logic to create the user
     */

    //read the request body
    const request_body = req.body


    //Insert the data in the user collection in mongodb

    const userObj = {
        name: request_body.name,
        userId: request_body.userId,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password, 8)
    }

    try {
        const user_created = await userModel.create(userObj)

        // return the user
        const res_obj = {
            name: user_created.name,
            userId: user_created.userId,
            email: user_created.email,
            userType: user_created.userType,
            createdAt: user_created.createdAt,
            updatedAt: user_created.updatedAt
        }
        res.status(201).send(res_obj)
    } catch (err) {
        console.log("Error while registering the user", err)
        res.status(500).send({
            message: "Some error happend while registering the user"
        })
    }


    //return the response back to the user
}

exports.signin = async (req, res) => {
    //check user id is present in system
    const user = await userModel.findOne({ userId: req.body.userId })
    if (user == null) {
        return res.status(400).send({
            message: "user id passed is not a valid user id"
        })
    }
    //password is correct
    const isPaawordValid = bcrypt.compareSync(req.body.password, user.password)
    if (!isPaawordValid) {
        return res.status(401).send({
            message: "wrong password passed"
        })
    }

    //using jwt we will create the access token with a given TTL and return
    const token = jwt.sign({ id: user.userId }, secret.secret, { expiresIn: 120 })
    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        accesstoken: token
    })

}