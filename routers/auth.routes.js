/**
 * POST localhost:8888/ecomm/api/v1/auth/signup
 * 
 * I need to insercept this
 */
const authcontroller = require('../controllers/auth.controller')
const authMW = require("../middlewares/auth_mw")
module.exports = (app) => {
    app.post("/ecomm/api/v1/auth/signup", [authMW.verifySignUpBody], authcontroller.signup)

/**
 * router for
 * POST localhost:8888/ecomm/api/v1/auth/signin
 */
app.post("/ecomm/api/v1/auth/signin",[authMW.verifySignInBody],authcontroller.signin)

}