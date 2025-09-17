import { mergeResolvers } from '@graphql-tools/merge';
import { userResolvers } from './user';
import { rideResolvers } from './ride';
import { paymentResolvers } from './payment';
import { locationResolvers } from './location';

export const resolvers = mergeResolvers([
  userResolvers,
  rideResolvers,
  paymentResolvers,
  locationResolvers
]);