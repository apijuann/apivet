const express = require('express')
const server = express()
const path = require('path')

server.get('/home', (req, res) => {
    const homePath = path.join(__dirname, 'src', 'views', 'home.html')
  res.sendFile(homePath)
})

server.get('/clientes', (req, res) => {
    const clientesPath = path.join(__dirname, 'src', 'views', 'clientes.html')
  res.sendFile(clientesPath)
})

server.get('/mascotas', (req, res) => {
    const mascotasPath = path.join(__dirname, 'src', 'views', 'mascotas.html')
  res.sendFile(mascotasPath)
})

const publicPath = path.join('src', 'public')
server.use(express.static(publicPath))


server.listen(4600, () => {
    console.log('Escuchando al servidor')
})
