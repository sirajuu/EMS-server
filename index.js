require('dotenv').config()
// environment variable loads into process.env only if there is config

const express = require('express')

const cors = require("cors")

const router = require('./routes/router')

require('./db/connection')



const server = express()

const PORT = process.env.PORT || 4000

server.use(cors())

server.use(express.json())


server.use("/uploads",express.static("./uploads"))

server.use(router)

server.get('/',(req,res)=>{
    res.send('EMS Server Started at the port ')
})

server.listen(PORT,()=>{
    console.log(`EMS Server Started at the port ${PORT}`);
})