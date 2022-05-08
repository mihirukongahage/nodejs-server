const graphql = require('graphql')
const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLString } = require("graphql");
const UserType = require("./typeDefs/userType");
const pool = require("../connection")


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLInt }},
            resolve: async (parent, args, context, resolveInfo) => {

                return new Promise((resolve, reject) => {
    
                    let query = `SELECT * FROM user`
                
                    pool.query(query, (err, result) => {
                        if(err){
                            return err
                        }
                        let notesArray = JSON.parse(JSON.stringify(result))
                        console.log(`return all notes`)
                        resolve(notesArray)
                    })
                });
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                email: { type: GraphQLString } 
            },
            resolve: async (parent, args) => {

                return new Promise((resolve, reject) => {

                    let query = `INSERT INTO user (username, password, email) VALUES (?, ?, ?)`
                    let values = [args.username, args.password, args.email]

                    pool.query(query, values, (err, result) => {
                        if(err){
                            console.log(err)
                            return err
                        } 
                        console.log(`user ${args.username} created`)
                        resolve (args)
                    })
                })
            }
        }
    }
})


module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })

