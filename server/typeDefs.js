const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Query{
        todolistget: [GetTodo]
    }

    type GetTodo{
        id: ID
        story:String
        task: String
        date: String
        time: String
    }

    type Todo {
        error: String
    }
    
    type Mutation{
        posttodolist(task: String, date: String, time: String): Todo
        deletetodolist(id: String): Todo
        edittodolist(id: String, task: String, date: String, time: String): Todo
    }
`;

module.exports = typeDefs;