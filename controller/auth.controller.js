const db = require("../model");
const {ReasonPhrases, StatusCodes} = require("http-status-codes");
const authConfig = require("../config/auth.config")

exports.createUser = (req, res) =>{
    const userObj = {
        name : req.body.name,
        mobile : req.body.mobile,
        email : req.body.email
    }

    let sql = `INSERT INTO customers (name, mobile, email) VALUES (?,?,?)`
    let values = [userObj.name, userObj.mobile, userObj.email];

    db.all(sql, values, function(err, result){
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }
        else{
            console.log('Customer Created', result);
            res.status(StatusCodes.CREATED).send({
                message : "Customer has been created successfully",
                status : StatusCodes.CREATED,
                response : ReasonPhrases.CREATED,
                data : userObj
            })
        }
    })
}
exports.createAddress = (req, res) =>{
    const addObj = {
        city : req.body.city,
        state : req.body.state,
        country : req.body.country,
        customerID : req.body.customerID
    }

    let sql = `INSERT INTO address (city, state, country, customerID) VALUES (?,?,?,?)`
    let values = [addObj.city, addObj.state, addObj.country, addObj.customerID];

    db.all(sql, values, function(err, result){
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }
        else{
            console.log('Address Created', result);
            res.status(StatusCodes.CREATED).send({
                message : "Address has been created successfully",
                status : StatusCodes.CREATED,
                response : ReasonPhrases.CREATED,
                data : addObj
            })
        }
    })
}

exports.getAllUser = (req, res) =>{
    let sql = `SELECT * FROM customers`;
    let params = [];
    db.all(sql, params, (err, users) => {
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            if(users){
                res.status(StatusCodes.OK).send({
                    message : "List of all the customers",
                    status : StatusCodes.OK,
                    response : ReasonPhrases.OK,
                    data : users
                });
                return;
            }else{
                res.status(StatusCodes.NOT_FOUND).send({
                    status : StatusCodes.NOT_FOUND,
                    response : ReasonPhrases.NOT_FOUND
                })
                return;
            }
        }
    })
}


// all customers with address
exports.getAllUserwithAdd = (req, res) =>{
    let sql = `select c.*,a.*
    from Customers c
    left join Address a
    on a.customerID = c.customerID`;
    let params = [];
    db.all(sql, params, (err, users) => {
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            if(users){
                res.status(StatusCodes.OK).send({
                    message : "List of all the customers with address",
                    status : StatusCodes.OK,
                    response : ReasonPhrases.OK,
                    data : users
                });
                return;
            }else{
                res.status(StatusCodes.NOT_FOUND).send({
                    status : StatusCodes.NOT_FOUND,
                    response : ReasonPhrases.NOT_FOUND
                })
                return;
            }
        }
    })
}



// Get all address
exports.getAllAddress = (req, res) =>{
    let sql = `SELECT * FROM address`;
    let params = [];
    db.all(sql, params, (err, address) => {
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            if(address){
                res.status(StatusCodes.OK).send({
                    message : "List of all the address",
                    status : StatusCodes.OK,
                    response : ReasonPhrases.OK,
                    data : address
                });
                return;
            }else{
                res.status(StatusCodes.NOT_FOUND).send({
                    status : StatusCodes.NOT_FOUND,
                    response : ReasonPhrases.NOT_FOUND
                })
                return;
            }
        }
    })
}

exports.getUser = (req, res) => {
    let sql = `SELECT * FROM customers WHERE customerID = ?`;
    let params = [req.params.id];
    db.get(sql, params, (err, user) =>{
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            if(user){
                res.status(StatusCodes.OK).send({
                    message : "Single customer",
                    status : StatusCodes.OK,
                    response : ReasonPhrases.OK,
                    data : user
                })
                return;
            }else{
                res.status(StatusCodes.NOT_FOUND).send({
                    status : StatusCodes.NOT_FOUND,
                    response : ReasonPhrases.NOT_FOUND
                })
                return;
            }
        }
    })
}
exports.getAddress = (req, res) => {
    let sql = `SELECT * FROM address WHERE addressID = ?`;
    let params = [req.params.id];
    db.get(sql, params, (err, address) =>{
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            if(address){
                res.status(StatusCodes.OK).send({
                    message : "Single Address",
                    status : StatusCodes.OK,
                    response : ReasonPhrases.OK,
                    data : address
                })
                return;
            }else{
                res.status(StatusCodes.NOT_FOUND).send({
                    status : StatusCodes.NOT_FOUND,
                    response : ReasonPhrases.NOT_FOUND
                })
                return;
            }
        }
    })
}

// Single customer with address
exports.getUserwithAdd = (req, res) => {
    let sql = `select c.*,a.*
    from Customers c
    left join Address a
    on a.customerID = c.customerID
    where  c.customerID = ?`;
    let params = [req.params.id];
    db.get(sql, params, (err, user) =>{
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            if(user){
                res.status(StatusCodes.OK).send({
                    message : "Single Customer",
                    status : StatusCodes.OK,
                    response : ReasonPhrases.OK,
                    data : user
                })
                return;
            }else{
                res.status(StatusCodes.NOT_FOUND).send({
                    status : StatusCodes.NOT_FOUND,
                    response : ReasonPhrases.NOT_FOUND
                })
                return;
            }
        }
    })
}



exports.updateUser = (req, res)=>{

    let userObj = {
        name : req.body.name,
        mobile : req.body.mobile,
        email : req.body.email,
        }

    let sql = `UPDATE customers SET
                name = coalesce(?, name),               
                mobile = coalesce(?, mobile),
                email = coalesce(?, email)
                WHERE customerID = ?`;
    let params = [userObj.name, userObj.mobile, userObj.email, req.params.id];
    db.get(sql, params, (err)=>{
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            res.status(StatusCodes.ACCEPTED).send({
                message : "Customer has been updated successfully",
                status : StatusCodes.ACCEPTED,
                response : ReasonPhrases.ACCEPTED
            })
            return;
        }
    })
}


exports.updateAddress = (req, res)=>{

    let userObj = {
        city : req.body.city,
        state :req.body.state,
        country : req.body.country,
        }

    let sql = `UPDATE address set
                city = coalesce(?, city),
                state = coalesce(?, state),
                country = coalesce(?, country)
                WHERE addressID = ?`;
    let params = [userObj.city, userObj.state, userObj.country, req.params.id];
    db.get(sql, params, (err)=>{
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            res.status(StatusCodes.ACCEPTED).send({
                message : "Address has been updated successfully",
                status : StatusCodes.ACCEPTED,
                response : ReasonPhrases.ACCEPTED
            })
            return;
        }
    })
}


exports.deleteUser = (req, res) =>{

    let sql = `DELETE FROM customers WHERE customerID = ?`;
    let params = [req.params.id];
    db.get(sql, params, (err)=>{
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            res.status(StatusCodes.OK).send({
                message : "Customer has been removed",
                status : StatusCodes.OK,
                response : ReasonPhrases.OK
            })
            return;
        }
    })
}

exports.deleteAddress = (req, res) =>{

    let sql = `DELETE FROM address WHERE addressID = ?`;
    let params = [req.params.id];
    db.get(sql, params, (err)=>{
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            res.status(StatusCodes.OK).send({
                message : "Address has been removed",
                status : StatusCodes.OK,
                response : ReasonPhrases.OK
            })
            return;
        }
    })
}
