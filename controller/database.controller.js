const db = require('../model');
const { Client } = require('pg');

const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const navigator = require('navigator');

exports.sync = async (req, res) => {
    try {
        console.log('user is online : ' + navigator.onLine)
        if (navigator.onLine) {
            const client = new Client({
                host: "localhost",
                user: "postgres",
                port: 5432,
                password: "0000",
                database: "customeradd"
            });

            client.connect((err) => {
                if (err) {
                    console.log(`connection error`, err.statck);
                } else {
                    console.log(`Successfully connected to PostgreSQL`);
                }
            });

            // checking the table is exists or not 
            const customerTable = await client.query(`
            SELECT EXISTS(
                SELECT * 
                FROM information_schema.tables 
                WHERE  
                  table_name = 'customers'
            );
            `)
            if (!customerTable.rows[0].exists) {
                //creating the userTable for postgreSql
                const createCustomerTable = await client.query(`CREATE TABLE customers 
                (
                    customerid serial primary key,
                    name TEXT NOT NULL,
                    mobile BIGINT NOT NULL,
                    email TEXT NOT NULL
                )`);
                console.log("Successfully Created the Customer Table", createCustomerTable);
            }

            // fetching the data from sqlite
            //customer data
            db.all(`SELECT * FROM customers`, (err, result) => {
                if (err) {
                    console.log('Error while fetching the customers data ' + err);
                }
                else {
                    // console.log(result);
                    result.forEach(async(customer) => {
                        let insert = `INSERT INTO customers(name, mobile, email) VALUES($1,$2,$3) RETURNING *`
                        let values = [customer.name, customer.mobile, customer.email];
                        console.log(values);
                        const response = await client.query(insert, values);
                        // console.log(response);
                    })
                }
            })

            // clean local database;
            db.run(`DELETE FROM customers;`,(err)=>{
                if(err){
                    console.log(`Some error while clearing local storage ${err}`);
                }
                else{
                    console.log('Successfully clear the data');
                }
            })

            res.status(StatusCodes.ACCEPTED).send({
                status : StatusCodes.ACCEPTED,
                response : ReasonPhrases.ACCEPTED,
                message : "Successfully  Sync the Database"
            })

        }
        else {
            res.status(StatusCodes.BAD_REQUEST).send({
                status: StatusCodes.BAD_REQUEST,
                response: ReasonPhrases.BAD_REQUEST
            })
        }
    }
    catch (err) {
        console.log(`Error while the Database Sync ${err}!!!`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
}