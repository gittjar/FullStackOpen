const { ApolloServer, gql } = require('apollo-server');
const repositories = require('./repositories');

// Mock user data
const users = [
  { id: '1', username: 'username' },
];

// Function to get user by ID
const getUserById = (id) => users.find(user => user.id === id);

// GraphQL type definitions
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
    logout: Boolean
  }
`;

// GraphQL resolvers
const resolvers = {
  Query: {
    hello: () => 'Hei maailma!',
    repositories: () => ({
      edges: repositories.map((repo) => ({
        node: repo,
      })),
    }),
    me: (root, args, context) => {
      const userId = context.user ? context.user.id : null;
      return userId ? getUserById(userId) : null;
    },
  },
  Mutation: {
    authenticate: (root, args) => {
      const { username, password } = args.credentials;
      const user = users.find(user => user.username === username && password === 'password');
      if (user) {
        return { accessToken: 'token--TESTI' };
      } else {
        throw new Error('Invalid credentials');
      }
    },
    logout: () => {
      // No server-side action needed for logout in this mock setup
      return true;
    },
  },
};

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Mock authentication context
    const token = req.headers.authorization || '';
    const user = token === 'Bearer token--TESTI' ? users[0] : null;
    return { user };
  },
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});