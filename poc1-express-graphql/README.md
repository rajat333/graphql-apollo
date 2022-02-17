

The three configuration properties which are used for the Express GraphQL middleware are the following:

1. schema: The GraphQL schema which should be attached to the specific endpoint

2. rootValue: The root resolver object

3. graphiql: Must be set to true to enable the GraphiQL tool when accessing the endpoint in the browser. GraphiQL is a graphical interactive in-browser GraphQL IDE. By using this tool you can directly write your queries in the browser and try out the endpoint.

https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1


query getSingleCourse($courseID: Int!) {
    course(id: $courseID) {
        title
        author
        description
        topic
        url
    }
}
// Remove paramter as per user expectation in above query


Using Aliases & Fragments
You’re able to include multiple queries in one query operation. In the following example the getCourseWithFragments query operations contains two queries for single courses. To distinguish between both queries we’re assigning aliases: course1 and course2.
query getCourseWithFragments($courseID1: Int!, $courseID2: Int!) {
      course1: course(id: $courseID1) {
             ...courseFields
      },
      course2: course(id: $courseID2) {
            ...courseFields
      } 
}
fragment courseFields on Course {
  title
  author
  description
  topic
  url
}