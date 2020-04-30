const mysql = require('mysql')

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Ha22091984',
    database:'backend_jc12',
    port:'3306'
})

db.connect(err => {
    if (err) {
        console.log(err)
    }
    console.log('Connected to mySQL')
})

module.exports = db