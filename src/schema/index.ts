import { mergeTypeDefs } from '@graphql-tools/merge';
import { baseTypeDefs } from './base';
import { userTypeDefs } from './user';
import { rideTypeDefs } from './ride';

import { paymentTypeDefs } from './payment';
import { locationTypeDefs } from './location';

export const typeDefs = mergeTypeDefs([
  baseTypeDefs,
  userTypeDefs,
  rideTypeDefs,
  paymentTypeDefs,
  locationTypeDefs,
]);