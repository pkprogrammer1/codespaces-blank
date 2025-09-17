export const paymentTypeDefs = `
  enum PaymentStatus {
    PENDING
    COMPLETED
    FAILED
  }

  enum PaymentMethod {
    CREDIT_CARD
    CASH
    WALLET
  }

  type Payment {
    id: ID!
    amount: Float!
    status: PaymentStatus!
    method: PaymentMethod!
    rideId: ID!
    ride: Ride!
    userId: ID!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  input CreatePaymentInput {
    amount: Float!
    method: PaymentMethod!
    rideId: ID!
    userId: ID!
  }

  input UpdatePaymentInput {
    status: PaymentStatus
    method: PaymentMethod
    amount: Float
  }

  extend type Query {
    payments: [Payment!]!
    payment(id: ID!): Payment
    paymentsByUser(userId: ID!): [Payment!]!
    paymentsByRide(rideId: ID!): Payment
  }

  extend type Mutation {
    createPayment(input: CreatePaymentInput!): Payment!
    updatePayment(id: ID!, input: UpdatePaymentInput!): Payment!
    deletePayment(id: ID!): Boolean!
  }
`;