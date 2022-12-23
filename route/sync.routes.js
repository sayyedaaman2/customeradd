const database = require('../controller/database.controller');
module.exports = (app)=>{

    app.post('/sync/database', database.sync);
}