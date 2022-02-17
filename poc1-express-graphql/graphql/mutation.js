const types = require('./types');

const mutation = `
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    },
`;

module.exports = mutation;
