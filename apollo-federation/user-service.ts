
import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer, gql } from 'apollo-server';
import User from './datasources/models/User';
import mongoStore from './mongoStore';

/* 
The @key directive helps other services understand the User schema is,
in fact, an entity that can be extended within other individual services.
The fields will help other services uniquely identify individual instances
of the User schema based on the id.
*/

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    username: String!
  }
  extend type Query {
    users: [User]
    user(id: ID!): User
  }
  extend type Mutation {
    createUser(userPayload: UserPayload): User
  }
  input UserPayload {
    username: String!
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      const allUsers = await User.find({});
      return allUsers;
    },
    user: async (_, { id }) => {
      const currentUser = await User.findOne({ _id: id });
      return currentUser;
    },
  },
  User: {
    __resolveReference: async (ref) => {
      const currentUser = await User.findOne({ _id: ref.id });
      return currentUser;
    },
  },
  Mutation: {
    createUser: async (_, { userPayload: { username } }) => {
      const user = new User({ username });
      const createdUser = await user.save();
      return createdUser;
    },
  },
};

mongoStore();

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`User service ready at url: ${url}`);
});

/* 
In the resolvers, we define a __resolveReference function responsible 
for returning an instance of the User entity to all other implementing
services, which just have a reference id of a User entity and need to
return an instance of the User entity. The ref parameter is an object
{ id: ‘userEntityId’ } that contains the id of an instance of the User
entity that may be passed down from other implementing services that 
need to resolve the reference of a User entity based on the reference id.
*/
