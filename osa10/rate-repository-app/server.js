const { ApolloServer, gql } = require('apollo-server');
const repositories = require('./repositories');

// tyypit apollo-serverin käyttöön
const typeDefs = gql`
  type Repository {
    id: ID!
    fullName: String
    description: String
    language: String
    forksCount: Int
    stargazersCount: Int
    ratingAverage: Int
    reviewCount: Int
    ownerAvatarUrl: String
  }

  type RepositoryEdge {
    node: Repository
  }

  type RepositoryConnection {
    edges: [RepositoryEdge]
  }

  type AuthenticateResult {
    accessToken: String
  }

  input AuthenticateInput {
    username: String!
    password: String!
  }

  type User {
    id: ID!
    username: String!
  }

  type Query {
    repositories: RepositoryConnection
    hello: String
    me: User
  }

  type Mutation {
    authenticate(credentials: AuthenticateInput): AuthenticateResult
  }
`;


// resolvers apollo-serverin käyttöön
const resolvers = {
  Query: {
    hello: () => 'Hei maailma!',
    repositories: () => ({
      edges: repositories.map((repo) => ({
        node: repo,
      })),
    }),

    me: (root, args, context) => {
      const userId = context.user.id;
      return getUserById(userId); 
    },
  },

  Mutation: {
    authenticate: (root, args) => {
      // tsekkaa käyttäjän tiedot ja palauta token
      // tämä pitää olla uniiikki jokaiselle käyttäjälle
      if (args.credentials.username === 'username' && args.credentials.password === 'password') {
        return { accessToken: 'token--TESTI' };
      } else {
        throw new Error('Invalid credentials');
      }
    },
  },
};

// serverin luonti
const server = new ApolloServer({ typeDefs, resolvers });

// serverin käynnistys
server.listen().then(({ url }) => {
  console.log(`🚀 Serveri toiminnassa ! ---> ${url}`);
});