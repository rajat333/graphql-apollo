## Apollo Federation Demo

This repository is a demo of using Apollo Federation to build a single schema on top of multiple services. The microservices are located under the [`./services`](./services/) folder and the gateway that composes the overall schema is in the [`gateway.js`](./gateway.js) file.

### Installation

To run this demo locally, pull down the repository then run the following commands:

```sh
npm install
```

This will install all of the dependencies for the gateway and each underlying service.

```sh
npm run start-services
```

This command will run all of the microservices at once. They can be found at http://localhost:4001, http://localhost:4002, http://localhost:4003, and http://localhost:4004.

In another terminal window, run the gateway by running this command:

```sh
npm run start-gateway
```

This will start up the gateway and serve it at http://localhost:4000

### What is this?

This demo showcases four partial schemas running as federated microservices. Each of these schemas can be accessed on their own and form a partial shape of an overall schema. The gateway fetches the service capabilities from the running services to create an overall composed schema which can be queried. 

To see the query plan when running queries against the gateway, click on the `Query Plan` tab in the bottom right hand corner of [GraphQL Playground](http://localhost:4000) - Gateway PORT


We have taken Query only in single micorservice i.e account which is User specific data. 

Now to see reviews done by users. For that we have extended type User in review to add review section for a single user in a query.
i.e extend type User 
@external - specify field is from another user.

# Authentication and Authorization
https://www.apollographql.com/blog/backend/auth/setting-up-authentication-and-authorization-apollo-federation/

# Graphql Shield 
To avoid DRY principle i.e check req.user exist in each resolver 
and avoid error in case of no context i.e login user. 
We add auth at abstraction layer.
https://github.com/maticzav/graphql-shield