import { mergeTypeDefs } from '@graphql-tools/merge';
import { baseTypeDefs } from './base';
import { userTypeDefs } from './user';
import { rideTypeDefs } from './ride';

export const typeDefs = mergeTypeDefs([
  baseTypeDefs,
  userTypeDefs,
  rideTypeDefs,
]);