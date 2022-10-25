const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const typeDefs  = require("./typeDefs");
const resolvers = require("./resolvers");
const { ApolloServer } = require("apollo-server-express");

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const app = express();

mongoose.connect("mongodb://127.0.0.1/todolist", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("database connected")).catch(() => console.log("Error"));

app.use(cors());

server.applyMiddleware({app});

const port = process.env.PORT || 5000;

app.listen(port, "localhost", () => {
    console.log(`Server started running on port: ${port} http://localhost:5000${server.graphqlPath}`);
});