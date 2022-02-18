import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer, gql } from 'apollo-server';
import Tweet from './datasources/models/Tweet';
import TweetAPI from './datasources/tweet';
import mongoStore from './mongoStore';

/*
We extend the User entity schema in this service, which has the id field
with an @external directive. This helps the Tweet service understand that
based on the given id field of the User entity schema, the instance of
the User entity needs to be derived from another service (user service
 in this case).
*/

const typeDefs = gql`
  type Tweet {
    text: String
    id: ID!
    creator: User
  }
  extend type User @key(fields: "id") {
    id: ID! @external
    tweets: [Tweet]
  }
  extend type Query {
    tweet(id: ID!): Tweet
    tweets: [Tweet]
  }
  extend type Mutation {
    createTweet(tweetPayload: TweetPayload): Tweet
  }
  input TweetPayload {
    userId: String
    text: String
  }
`;

const resolvers = {
  Query: {
    tweet: async (_, { id }) => {
      const currentTweet = await Tweet.findOne({ _id: id });
      return currentTweet;
    },
    tweets: async () => {
      const tweetsList = await Tweet.find({});
      return tweetsList;
    },
  },
  Tweet: {
    creator: (tweet) => ({ __typename: 'User', id: tweet.userId }),
  },
  User: {
    tweets: async (user) => {
      const tweetsByUser = await Tweet.find({ userId: user.id });
      return tweetsByUser;
    },
  },
  Mutation: {
    createTweet: async (_, { tweetPayload: { text, userId } }) => {
      const newTweet = new Tweet({ text, userId });
      const createdTweet = await newTweet.save();
      return createdTweet;
    },
  },
};

mongoStore();
/*
To resolve the creator field of the Tweet entity, the Tweet service
needs to tell the gateway that this field will be resolved by the User
service. Hence, we pass the id of the User and a __typename for the
gateway to be able to call the right service to resolve the User
entity instance. In the User service earlier, we wrote a
__resolveReference resolver, which will resolve the reference of
a User based on an id 
*/

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`Tweet service ready at url: ${url}`);
});