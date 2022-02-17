const express = require('express');
// const express_graphql = require('express-graphql');
const expressGraphQL = require('express-graphql').graphqlHTTP

const { buildSchema } = require('graphql');

const { getCourse , getCourses, updateCourseTopic }  = require('./util/courses');
const query = require('./graphql/query');
const mutation = require('./graphql/mutation');
const types = require('./graphql/types');

/*  
    GraphQL schema
    There can be only one type named "Query".
    There can be only one type named "resolver".
*/

var schema = buildSchema(`
    ${ query },
    ${ mutation },
    ${ types }
`);

// Root resolver
var root = {
    message: () => 'Hello World!',
    course: getCourse,  // Part of query getCourse & getCourses is fn
    courses: getCourses,
    updateCourseTopic,
};

// Create an express server and a GraphQL endpoint
var app = express();

app.use('/graphql', expressGraphQL({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
