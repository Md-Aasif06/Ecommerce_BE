/**
 * POST localhost:8888/ecomm/api/v1/auth/signup
 * 
 * I need to insercept this
 */
const authcontroller=require('../controllers/auth.controller')
module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signup",authcontroller.signup)
}