import { mergeResolvers } from '@graphql-tools/merge';
import { userResolvers } from './user';
import { rideResolvers } from './ride';

export const resolvers = mergeResolvers([
  userResolvers,
  rideResolvers,
]);