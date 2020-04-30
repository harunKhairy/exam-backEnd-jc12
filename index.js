const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const PORT = 5000
app.use(cors())  //izin ke frontend apapun buat akses backend

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get('/', (req, res) => {
    return res.send('<h1>Welcome to JC-12 server</h1>')
})

const { productRouters, storeRouters, inventoryRouters } = require('./routers')

app.use('/product', productRouters)
app.use('/store', storeRouters)
app.use('/inventory', inventoryRouters)

app.listen(PORT, () => console.log('server running on port ' + PORT ))