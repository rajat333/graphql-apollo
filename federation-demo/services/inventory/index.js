const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

/*
We extend the Product entity schema in this service, 
which has the upc, weight, price field with an @external 
directive. This helps the inventory service understand
that based on the given external field of the different
entity schema, the instance of the Product entity needs 
to be derived from another service (product service in this case).
*/
// upc , price is from Product service
// weight is from review service
const typeDefs = gql`
  extend type Product @key(fields: "upc") {
    upc: String! @external
    weight: Int @external
    price: Int @external
    inStock: Boolean
    shippingEstimate: Int @requires(fields: "price weight")
  }
`;

const resolvers = {
  Product: {
    __resolveReference(object, args) {
      console.log('inventory service product resolver', object, args);
      console.log('inventory.find(product => product.upc === object.upc)', inventory.find(product => product.upc === object.upc));
      return {
        ...object,
        ...inventory.find(product => product.upc === object.upc)
      };
    },
    shippingEstimate(object) {
      // free for expensive items
      console.log('object object', object);
      if (object.price > 1000) return 0;
      // estimate is based on weight
      return object.weight * 0.5;
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen({ port: 4004 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const inventory = [
  { upc: "1", inStock: true },
  { upc: "2", inStock: false },
  { upc: "3", inStock: true }
];
