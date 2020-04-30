const { db } = require('../connection')
const fs = require('fs')
const { uploader } = require('../util/uploader')

module.exports = {

    getAllProducts: (req, res) => {
        let sql = `SELECT * FROM product`;
        db.query(sql, (err, results) => {
            if(err)res.status(500).send(err.message)
            res.status(200).send(results)
        })
    },

    addProduct: (req, res) => {
        const path = '/product'
        const upload = uploader(path, 'PROD').fields([{ name : 'image' }]);
        upload(req, res, (err) => {
            const { image } = req.files;
            const { nama, harga } = JSON.parse(req.body.data)
            const imagePath = image ? `${path}/${image[0].filename}` : null
    
            let sql = `INSERT INTO product (nama, harga, imagePath) VALUES ('${nama}', ${harga}, '${imagePath}')`
            db.query(sql, req.body, (err, result) => {
                if(err){
                    fs.unlinkSync(`./public${imagePath}`)
                    res.status(500).send(err.message)
                }
                res.status(200).send(result)
            })
        })
    },

    editProduct:(req, res) => {
        let { id } = req.params
        let sql = `SELECT * FROM product WHERE product_id = ${id}`;
        db.query(sql, (err, results) => {
            if(err)res.status(500).send(err.message)
    
            const oldImagePath = results[0].imagePath
            const path = '/product'
            const upload = uploader(path, 'PROD').fields([{ name : 'image' }])
            upload(req, res, (err) => {
                const { image } = req.files;
                const { nama, harga } = JSON.parse(req.body.data)
                const imagePath = image ? `${path}/${image[0].filename}` : null
    
                let sql = 
                        `UPDATE product SET 
                        nama = '${nama}', 
                        harga = ${harga}, 
                        imagePath = '${imagePath}' 
                        WHERE product_id = ${id}`;
                        
                db.query(sql, req.body, (err, update) => {
                    if (err) {
                        fs.unlinkSync(`./public${imagePath}`)
                        res.status(500).send(err.message)
                    }
                    if(image){
                        fs.unlinkSync(`./public${oldImagePath}`)
                    }
                    res.status(200).send(update)
                })
            })
        })
    },

    deleteProduct: (req, res) => {
        let { id } = req.params
        let sql = `SELECT * FROM product WHERE product_id = ${id}`;
        db.query(sql, (err, results) => {
            if(err)res.status(500).send(err.message)
    
            const oldImagePath = results[0].imagePath
            let sql = `DELETE FROM product WHERE product_id = ${id}`;
            db.query(sql, (err, res1) => {
                if(err)res.status(500).send(err.message)
                fs.unlinkSync(`./public${oldImagePath}`)
                res.status(200).send(res1)
            })
        })
    }

}