import { Context } from '../context';

export const locationResolvers = {
  Query: {
    locations: async (_: any, __: any, { prisma }: Context) => {
      return prisma.location.findMany({
        include: {
          user: true,
          ridesFrom: true,
          ridesTo: true,
        },
      });
    },

    location: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      return prisma.location.findUnique({
        where: { id },
        include: {
          user: true,
          ridesFrom: true,
          ridesTo: true,
        },
      });
    },

    locationsByUser: async (_: any, { userId }: { userId: string }, { prisma }: Context) => {
      return prisma.location.findMany({
        where: { userId },
        include: {
          user: true,
          ridesFrom: true,
          ridesTo: true,
        },
      });
    },
  },

  Mutation: {
    createLocation: async (
      _: any,
      { input }: { input: { name: string; address: string; latitude: number; longitude: number; userId: string } },
      { prisma }: Context
    ) => {
      return prisma.location.create({
        data: {
          ...input,
          user: { connect: { id: input.userId } },
        },
        include: {
          user: true,
          ridesFrom: true,
          ridesTo: true,
        },
      });
    },

    updateLocation: async (
      _: any,
      { id, input }: { id: string; input: { name?: string; address?: string; latitude?: number; longitude?: number } },
      { prisma }: Context
    ) => {
      return prisma.location.update({
        where: { id },
        data: input,
        include: {
          user: true,
          ridesFrom: true,
          ridesTo: true,
        },
      });
    },

    deleteLocation: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      try {
        await prisma.location.delete({
          where: { id },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
  },

  Location: {
    user: async (parent: any, _: any, { prisma }: Context) => {
      return prisma.user.findUnique({
        where: { id: parent.userId },
      });
    },
    ridesFrom: async (parent: any, _: any, { prisma }: Context) => {
      return prisma.ride.findMany({
        where: { fromLocationId: parent.id },
      });
    },
    ridesTo: async (parent: any, _: any, { prisma }: Context) => {
      return prisma.ride.findMany({
        where: { toLocationId: parent.id },
      });
    },
  },
};