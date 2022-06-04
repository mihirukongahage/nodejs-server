const UserType = require("./types/user");
const { GraphQLObjectType, GraphQLList, GraphQLInt } = require("graphql");
const pool = require("../connection");
const logger = require("../logger/logger");

const query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    // get all users
    users: {
      description: "get all users",
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve: async (parent, args, context, resolveInfo) => {
        return new Promise((resolve, reject) => {
          let query = `SELECT * FROM user`;
          pool.query(query, (err, result) => {
            if (err) {
              return err;
            }
            let users = JSON.parse(JSON.stringify(result));
            logger.info(`return all notes`);
            resolve(users);
          });
        });
      },
    },

    // get a user by id
    user: {
      description: "get user by id",
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve: async (parent, args) => {
        return new Promise((resolve, reject) => {
          let query = `SELECT * FROM user WHERE id=?`;
          let values = [args.id];
          pool.query(query, values, (err, result) => {
            if (err) {
              return err;
            }
            let user = JSON.parse(JSON.stringify(result))[0];
            logger.info(`return user with id: ${args.id}`);
            resolve(user);
          });
        });
      },
    },
  }),
});

module.exports = query;
