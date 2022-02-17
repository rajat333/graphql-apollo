//include express module or package
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

const config = require('./config/config');
const models = require('./models');
const { getUser } = require('./utils/getUser');

// GraphQL's schema ‘Query’
const typeDefs = require('./schema');

// create resolver functions for Query schema
const resolvers = require('./resolvers');

//create instance of express
const app = express();

const db = require('./db');

console.log('config', config.DB_URL);
// Connect to Database
db.connect(config.DB_URL);


//Create an instance of Apollo Server
const server = new ApolloServer({ 
    typeDefs,
    resolvers, 
    // introspection: true,
    context: ({ req }) => {
         // get the user token from the headers
        //  const token = req.headers.authorization;

        //  req.user = getUser(token);

         // add the db models and the user to the context
        return { models , req };
    } 
});

async function initalizeServer() {
	await server.start();

	//Apply the Apollo GraphQL middleware and set the path to /api
	server.applyMiddleware({ app, path: '/api' });
}

initalizeServer();

app.get('/', (req, res) => res.send('Hello World'));

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port : ${port}`));
