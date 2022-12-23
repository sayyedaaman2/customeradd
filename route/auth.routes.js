const authController = require('../controller/auth.controller');
const {validateBody} = require('../middleware/index');
module.exports = (app)=>{

    //  POST /user
    app.post('/user', validateBody.validateSignUp , authController.createUser);


    //  POST /address
    app.post('/address', authController.createAddress);


    //  POST /user/signin
    // app.post('/user/signin/', validateBody.validateSignIn, authController.signIn);


     //  GET /user/:id     ---> Only single customer without address
    app.get('/user/:id', authController.getUser);


    //  GET /users            ---> Only customers without address
    app.get('/users', authController.getAllUser);


    //Get all address           ---> Only addresses without customers
    app.get('/address', authController.getAllAddress);


    //Get address by id           ---> Only addresses without customers
    app.get('/address/:id', authController.getAddress);


    //  PUT /user/:id             ---> Update Customer by customerID
    app.put('/user/:id', authController.updateUser);

    //  PUT /address/:id           ---> Update Address by addressID
    app.put('/address/:id', authController.updateAddress);


    //  DELETE /user/:id            ---> Delete Customer by customerID
    app.delete('/user/:id', authController.deleteUser);


    //GET all user with address
    app.get('/users/add', authController.getAllUserwithAdd);

    
    //GET single user with address
    app.get('/user/add/:id', authController.getUserwithAdd);


    //Delete particular address by id
    app.delete('/address/:id', authController.deleteAddress);

}