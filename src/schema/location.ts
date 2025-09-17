export const locationTypeDefs = `
  type Location {
    id: ID!
    name: String!
    address: String!
    latitude: Float!
    longitude: Float!
    userId: ID!
    user: User!
    ridesFrom: [Ride!]!
    ridesTo: [Ride!]!
    createdAt: String!
    updatedAt: String!
  }

  input CreateLocationInput {
    name: String!
    address: String!
    latitude: Float!
    longitude: Float!
    userId: ID!
  }

  input UpdateLocationInput {
    name: String
    address: String
    latitude: Float
    longitude: Float
  }

  extend type Query {
    locations: [Location!]!
    location(id: ID!): Location
    locationsByUser(userId: ID!): [Location!]!
  }

  extend type Mutation {
    createLocation(input: CreateLocationInput!): Location!
    updateLocation(id: ID!, input: UpdateLocationInput!): Location!
    deleteLocation(id: ID!): Boolean!
  }
`;