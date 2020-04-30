const { db } = require('../connection')


module.exports = {

    addInventory: (req, res) => {
        let sql = `INSERT INTO inventory SET ?`;
        db.query(sql, req.body, (err, result) => {
            if(err)res.status(500).send(err.message)
            res.status(200).send(result)
        })
    },

    getInventory: (req, res) => {
        let sql = 
            `SELECT
                nama AS "Product",
                branch_name AS "Branch Name",
                inventory as "Stock"
            FROM inventory
                JOIN product ON inventory.product_id = product.product_id
                JOIN store ON inventory.store_id = store.store_id;`;
        db.query(sql, (err, results) => {
            if(err)res.status(500).send(err.message)
            res.status(200).send(results)
        })
    },

    editInventory: (req, res) => {
        let sql = `UPDATE inventory SET ? WHERE inventory_id = ${req.params.id}`;
        db.query(sql, req.body, (err, result) => {
            if(err)res.status(500).send(err.message)
            res.status(200).send(result)
        })
    },

    deleteInventory: (req, res) => {
        let sql = `DELETE FROM inventory WHERE inventory_id = ${req.params.id}`;
        db.query(sql, (err, result) => {
            if(err)res.status(500).send(err.message)
            res.status(200).send(result)
        })
    }

}