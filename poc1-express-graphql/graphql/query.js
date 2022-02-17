const types = require('./types');

const query = `
    type Query {
        message: String,
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
`;

module.exports = query;
