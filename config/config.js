require('dotenv').config();
let con={
    database:process.env.db,
    port:process.env.PORT,
    sk:process.env.secret_key
}

module.exports = con;