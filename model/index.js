const sqlite3 = require("sqlite3").verbose();
const dbConfig = require("../config/db.config");

const dbSource = dbConfig.DB_SOURCE;

const db = new sqlite3.Database(dbSource, (err) => {

    if (err) {
        //Cannot connect to database
        console.log(err.message);
        throw err;
    }
    else {
        console.log('Connected to the SQLite Database');
        // db.run(`drop table customers`);
        // db.run(`drop table address`);

        // db.run(`CREATE TABLE IF NOT EXISTS customers (
        //     customerID integer primary key,
        //     name text,
        //     mobile integer,
        //     email text unique)`,
        //     function (err) {
        //         console.log('Customers Table Created Successfully');
        //         if (err) {
        //             console.log('Error while creating customers Table', err);
        //         }
        //         else {
        //             db.get('SELECT COUNT(*) FROM customers',
        //                 function (err, data) {
        //                     // console.log("data", data);
        //                     if (err) {
        //                         console.log('Some Error While Checking the customer data !', err);
        //                     }
        //                     else {
        //                         console.log(data["COUNT(*)"]);
        //                         if (data["COUNT(*)"] == 0) {
        //                             var insert = 'INSERT INTO customers(name, mobile, email) VALUES (?,?,?)'
        //                             db.run(insert, ["Parag Sinha", 9874563215, "paragsinha@gmail.com"])
        //                             db.run(insert, ["Himmat Singh",1236547856, "himmatsingh@gmail.com"])
        //                             db.run(insert, ["John Dave", 7458962541, "davejohn@gmail.com"])
        //                             console.log('Customers Table Initialized Successfully');
        //                         } else {
        //                             console.log('Customers already Initialized !')
        //                         }
        //                     }
        //                 }
        //             )
        //         }
        //     }
        // )
        // db.run(`PRAGMA foreign_keys=on`),
        // db.run(`CREATE TABLE IF NOT EXISTS address (
        //     addressID integer primary key,
        //     city text,
        //     state text,
        //     country text,
        //     customerID integer,
        //     constraint fk_customerID
        //     foreign key(customerID) references customers(customerID) on update cascade on delete cascade)`,
        //     function (err) {
        //         console.log('Address Table Created Successfully');
        //         if (err) {
        //             console.log('Error while creating address Table', err);
        //         }
        //         else {
        //             db.get('SELECT COUNT(*) FROM address',
        //                 function (err, data) {
        //                     // console.log("data", data);
        //                     if (err) {
        //                         console.log('Some Error While Checking the address data !', err);
        //                     }
        //                     else {
        //                         console.log(data["COUNT(*)"]);
        //                         if (data["COUNT(*)"] == 0) {
        //                             var insert = 'INSERT INTO address(city, state, country, customerID) VALUES (?,?,?,?)'
        //                             db.run(insert, ["Nagpur", "Maharashtra", "India",1])
        //                             db.run(insert, ["Ahmedabad", "Gujarat", "India",2])
        //                             db.run(insert, ["Panaji", "Goa", "India",3])
        //                             console.log('Address Table Initialized Successfully');
        //                         } else {
        //                             console.log('Address already Initialized !')
        //                         }
        //                     }
        //                 }
        //             )
        //         }
        //     }
        // )
    }
});

module.exports = db;