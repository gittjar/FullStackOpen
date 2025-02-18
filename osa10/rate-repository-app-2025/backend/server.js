const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const fs = require('fs');

// Load repositories from JSON file
const repositories = JSON.parse(fs.readFileSync('repositories.json', 'utf8'));

const typeDefs = `
  type Repository {
    id: ID!
    fullName: String!
    description: String!
    language: String!
    forksCount: Int!
    stargazersCount: Int!
    ratingAverage: Int!
    reviewCount: Int!
    ownerAvatarUrl: String!
  }

  type Query {
    repositoryCount: Int!
    allRepositories: [Repository!]!
    findRepository(id: ID!): Repository
  }
`;

const resolvers = {
  Query: {
    repositoryCount: () => repositories.length,
    allRepositories: () => repositories,
    findRepository: (root, args) =>
      repositories.find(repo => repo.id === args.id)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});