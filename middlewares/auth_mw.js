/**
 * check a mw will check if the request body is proper and correct
 */
const userModel = require('../modules/user.model')
const verifySignUpBody = async (req, res, next) => {
    try {
        // check the name
        if (!req.body.name) {
            return res.status(400).send({
                message: "Failed Name was not provided in the request body"
            })
        }
        //check the email
        if (!req.body.email) {
            return res.status(400).send({
                message: "Failed email was not provided in the request body"
            })
        }
        //check the userId
        if (!req.body.userId) {
            return res.status(400).send({
                message: "Failed userId was not provided in the request body"
            })
        }
        //cheeck the user with the same userId is already present
        const user = await userModel.findOne({ userId: req.body.userId })
        if (user) {
            return res.status(400).send({
                message: "failed: user with same userid is already presented"
            })
        }
        next()
    } catch (err) {
        console.log("Error while validating the request object", err)
        res.status(500).send({
            message: "Ereror while validating the request body"
        })
    }
}

module.exports={
    verifySignUpBody:verifySignUpBody
}