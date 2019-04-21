const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { findOrCreateUser } = require('./controllers/UserController');

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(data => {
    console.log('Db connected!');
  })
  .catch(err => console.error(`connection fail with ${err}`));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  /** intercept request */
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;

    try {
      authToken = req.headers.authorization;

      if (authToken) {
        // find or create user
        currentUser = await findOrCreateUser(authToken);
      }
    } catch (error) {
      console.error(`unable to auth user with token ${authToken}`);
    }
    return { currentUser };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is listening on ${url}`);
});
