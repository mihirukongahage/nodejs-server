const { GraphQLObjectType, GraphQLString } = require("graphql");
const UserType = require("./types/user");
const pool = require("../connection");
const logger = require("../logger/logger");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // create a new user
    user: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        return new Promise((resolve, reject) => {
          let query = `INSERT INTO user (username, password, email) VALUES (?, ?, ?)`;
          let values = [args.username, args.password, args.email];
          pool.query(query, values, (err, result) => {
            if (err) {
              logger.error(err);
              return err;
            }
            logger.info(`user ${args.username} created`);
            resolve(args);
          });
        });
      },
    },
  },
});

module.exports = mutation;
