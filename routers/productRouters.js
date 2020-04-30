const express = require('express')
const { productControllers } = require('../controllers')

const router = express.Router()

router.post('/addproduct', productControllers.addProduct)
router.get('/allproducts', productControllers.getAllProducts)
router.patch('/editproduct/:id', productControllers.editProduct)
router.delete('/deleteproduct/:id', productControllers.deleteProduct)

module.exports = router
