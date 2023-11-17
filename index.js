const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const config = require('./config')

const PORT = process.env.PORT || 5000


const startDataBase = async () => {
    let connectionString = null;
    try {
        console.info('Initializing database ...');
        connectionString = connectToMongoDb(
            `mongodb://127.0.0.1:27017/${config.mongo.dbName}`
        );
    } catch (e) {
        console.log(e)
    }
}

const app = express()
const server = http.createServer(app)
app.use(express.json())


startDataBase()

server.listen(PORT, () => {
    console.log(`server start ${PORT}`)
})

function connectToMongoDb(url, options) {
    mongoose.connect(url);

    mongoose.Promise = global.Promise;

    mongoose.connection.on('error', (err) => {
        console.error(`Mongoose connection error: ${err}`);
        process.exit(1);
    });
    mongoose.connection.once('open', function () {
        console.info('MongoDB is connected');
    });

    return mongoose.connection;
}