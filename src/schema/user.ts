export const userTypeDefs = `
  type User {
    id: ID!
    email: String!
    name: String
    rides: [Ride!]!
    createdAt: String!
    updatedAt: String!
  }

  input CreateUserInput {
    email: String!
    name: String
  }

  input UpdateUserInput {
    email: String
    name: String
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User
    userByEmail(email: String!): User
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
  }
`;