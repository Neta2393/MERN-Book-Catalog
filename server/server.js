const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});







// const express = require('express');
// const path = require('path');
// const { ApolloServer } = require('@apollo/server'); // Import ApolloServer
// const { typeDefs, resolvers } = require('./schema'); // Import your GraphQL schema, typeDefs, and resolvers
// const db = require('./config/connection');
// const routes = require('./routes');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/dist')));
// }

// app.use(routes);

// //Create an instance of ApolloServer and pass in your typeDefs and resolvers
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// // Apply the Apollo Server as middleware to your Express app
// server.applyMiddleware({ app });

// db.once('open', () => {
//   app.listen(PORT, () =>
//     console.log(`🌍 Now listening on localhost:${PORT}`)
//   );
// });





// const express = require('express');
// const path = require('path');
// const db = require('./config/connection');
// const routes = require('./routes');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/dist')));
// }

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });


// //Implement the Apollo Server and apply it to the Express server as middleware.