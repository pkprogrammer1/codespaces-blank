import { Context } from '../context';

export const rideResolvers = {
  Query: {
    rides: async (_: any, __: any, { prisma }: Context) => {
      return prisma.ride.findMany({
        include: { user: true },
      });
    },

    ride: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      return prisma.ride.findUnique({
        where: { id },
        include: { user: true },
      });
    },

    ridesByUser: async (_: any, { userId }: { userId: string }, { prisma }: Context) => {
      return prisma.ride.findMany({
        where: { userId },
        include: { user: true },
      });
    },
  },

  Mutation: {
    createRide: async (
      _: any,
      { input }: { input: { from: string; to: string; price: number; userId: string } },
      { prisma }: Context
    ) => {
      return prisma.ride.create({
        data: input,
        include: { user: true },
      });
    },

    updateRide: async (
      _: any,
      { id, input }: { id: string; input: { from?: string; to?: string; price?: number } },
      { prisma }: Context
    ) => {
      return prisma.ride.update({
        where: { id },
        data: input,
        include: { user: true },
      });
    },

    deleteRide: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      try {
        await prisma.ride.delete({
          where: { id },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
  },

  Ride: {
    user: async (parent: any, _: any, { prisma }: Context) => {
      return prisma.user.findUnique({
        where: { id: parent.userId },
      });
    },
  },
};