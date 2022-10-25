const posttodo = require("./models/posttodo");

const resolvers = {
    Query: { //fetching
        todolistget: () => posttodo.find().hint({ $natural : -1 })
    },
    Mutation: { //adding
        posttodolist: async (_, {task, date, time}) => {
            
            try {
                const putinto = new posttodo({task, date, time});
                await putinto.save();
                return {error: "no"};
            }catch(e){
                return {error: "yes"};
            }
        },
        deletetodolist: async (_, {id}) => {
            
            try {
                await posttodo.deleteOne({_id: id});
                return {error: "no"};
            }catch(e){
                return {error: "yes"};
            }
        },
        edittodolist: async (_, {id, task, date, time}) => {
            
            try {
                if(date === null && time === null){
                    await posttodo.updateOne({_id: id}, {$set:{task}});
                }else if(time === null){
                    await posttodo.updateOne({_id: id}, {$set:{task, date}});
                }else if(date === null){
                    await posttodo.updateOne({_id: id}, {$set:{task, time}});
                }else{
                    await posttodo.updateOne({_id: id}, {$set:{task, date, time}});
                }
                return {error: "no"};
            }catch(e){
                return {error: "yes"};
            }
        }
    }
}

module.exports = resolvers;