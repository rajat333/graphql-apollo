require('dotenv').config()

const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME;

const MONGO_PORT = process.env.MONGO_PORT;

const MONGO_DB = process.env.MONGO_DB;

const DB_URL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`

module.exports = { DB_URL };