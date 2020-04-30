const express = require('express')
const { inventoryControllers } = require('../controllers')

const router = express.Router()

router.post('/addinventory', inventoryControllers.addInventory)
router.get('/allinventory', inventoryControllers.getInventory)
router.patch('/editinventory/:id', inventoryControllers.editInventory)
router.delete('/deleteinventory/:id', inventoryControllers.deleteInventory)

module.exports = router