const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

// help to understand review will be used in other service with key 

const typeDefs = gql`
  type Query {
     getUserReview(id: Int!): [Review]
  }
  type Review @key(fields: "id") {
    id: ID!
    body: String
    author: User @provides(fields: "username")
    product: Product
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    username: String @external
    reviews: [Review]
  }

  extend type Product @key(fields: "upc") {
    upc: String! @external
    reviews: [Review]
  }
`;

const resolvers = {
  Query: {
    getUserReview(_, args) {
      const result =  reviews.filter( review => review.authorID == args.id );
      return result;
    },
  },
  Review: {
    author(review) {
      console.log('finding author from user service i.e account service');
      return { __typename: "User", id: review.authorID };
    }
  },
  User: {
    reviews(user) {
      console.log('in review service user reviews called', user);
      return reviews.filter(review => review.authorID === user.id);
    },
    numberOfReviews(user) {
      console.log('review service numberOfReviews');
      return reviews.filter(review => review.authorID === user.id).length;
    },
    username(user) {
      console.log('review service username username');
      const found = usernames.find(username => username.id === user.id);
      return found ? found.username : null;
    }
  },
  Product: {
    reviews(product) {
      console.log('review service find product based on code', product);
      return reviews.filter(review => review.product.upc === product.upc);
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    },
  ]),


});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const usernames = [
  { id: "1", username: "@ada" },
  { id: "2", username: "@complete" }
];
const reviews = [
  {
    id: "1",
    authorID: "1",
    product: { upc: "1" },
    body: "Love it!"
  },
  {
    id: "2",
    authorID: "1",
    product: { upc: "2" },
    body: "Too expensive."
  },
  {
    id: "3",
    authorID: "2",
    product: { upc: "3" },
    body: "Could be better."
  },
  {
    id: "4",
    authorID: "2",
    product: { upc: "1" },
    body: "Prefer something else."
  }
];
