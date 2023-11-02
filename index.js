const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

const penyewaRoutes = require('./penyewa')
const pemilikRoutes = require('./pemilik')
const kendaraanRoutes = require('./kendaraan')
const detailTransaksiRoutes = require('./detail_transaksi')
const transaksiSewaRoutes = require('./transaksi_sewa')

app.use('/api', penyewaRoutes)
app.use('/api', pemilikRoutes)
app.use('/api', kendaraanRoutes)
app.use('/api', detailTransaksiRoutes)
app.use('/api', transaksiSewaRoutes)

const port = 3000
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})
