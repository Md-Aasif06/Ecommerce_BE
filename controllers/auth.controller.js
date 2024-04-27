/**
 * I need to write the controller / logic to register user
 */

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
        const res_obj={
            name:user_created.name,
            userId:user_created.userId,
            email:user_created.email,
            userType:user_created.userType,
            createdAt:user_created.createdAt,
            updatedAt:user_created.updatedAt
        }
        res.status(201).send(res_obj)
    } catch (err) {
        console.log("Error while registering the user", err)
        res.status(500).send({
            message:"Some error happend while registering the user"
        })
    }


    //return the response back to the user
}