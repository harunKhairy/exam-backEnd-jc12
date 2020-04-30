const express = require('express')
const { storeControllers } = require('../controllers')

const router = express.Router()

router.post('/addstore', storeControllers.addStore)
router.get('/allstore', storeControllers.getStore)
router.patch('/editstore/:id', storeControllers.editStore)
router.delete('/deletestore/:id', storeControllers.deleteStore)

module.exports = router