// build your server here and require it from index.js
const express = require("express") // require express from express package

const server = express() // declare the express function into a variable called server

server.use(express.json()) // express function is a built-in middleware function in Express

server.use((err,req,res,next) => {
    next({
        status: err.status || 500,
        message: err.message,
        stack: err.stack
    })
}) // errorHandling

module.exports = server