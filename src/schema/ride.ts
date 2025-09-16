export const rideTypeDefs = `
  type Ride {
    id: ID!
    from: String!
    to: String!
    price: Float!
    user: User!
    userId: ID!
    createdAt: String!
    updatedAt: String!
  }

  input CreateRideInput {
    from: String!
    to: String!
    price: Float!
    userId: ID!
  }

  input UpdateRideInput {
    from: String
    to: String
    price: Float
  }

  extend type Query {
    rides: [Ride!]!
    ride(id: ID!): Ride
    ridesByUser(userId: ID!): [Ride!]!
  }

  extend type Mutation {
    createRide(input: CreateRideInput!): Ride!
    updateRide(id: ID!, input: UpdateRideInput!): Ride!
    deleteRide(id: ID!): Boolean!
  }
`;