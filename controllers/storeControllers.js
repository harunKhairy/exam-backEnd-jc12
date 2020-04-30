const { db } = require('../connection')
const fs = require('fs')

module.exports = {

    getStore:(req, res) => {
        let sql = `SELECT * FROM store`;
        db.query(sql, (err, results) => {
            if(err)res.status(500).send(err.message)
            res.status(200).send(results)
        })
    },

    addStore: (req, res) => {
        let sql = `INSERT INTO store SET ?`;
        db.query(sql, req.body, (err, result) => {
            if(err)res.status(500).send(err.message)
            res.status(200).send(result)
        })
    },

    editStore: (req, res) => {
        let sql = `UPDATE store SET ? WHERE store_id = ${req.params.id}`;
        db.query(sql, req.body, (err, result) => {
            if(err)res.status(500).send(err.message)
            res.status(200).send(result)
        })
    },

    deleteStore: (req, res) => {
        let sql = `DELETE FROM store WHERE store_id = ${req.params.id}`;
        db.query(sql, (err, result) => {
            if(err)res.status(500).send(err.message)
            res.status(200).send(result)
        })
    }
}