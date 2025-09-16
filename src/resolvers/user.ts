import { Context } from '../context';

export const userResolvers = {
  Query: {
    users: async (_: any, __: any, { prisma }: Context) => {
      return prisma.user.findMany({
        include: { rides: true },
      });
    },

    user: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      return prisma.user.findUnique({
        where: { id },
        include: { rides: true },
      });
    },

    userByEmail: async (_: any, { email }: { email: string }, { prisma }: Context) => {
      return prisma.user.findUnique({
        where: { email },
        include: { rides: true },
      });
    },
  },

  Mutation: {
    createUser: async (
      _: any,
      { input }: { input: { email: string; name?: string } },
      { prisma }: Context
    ) => {
      return prisma.user.create({
        data: input,
        include: { rides: true },
      });
    },

    updateUser: async (
      _: any,
      { id, input }: { id: string; input: { email?: string; name?: string } },
      { prisma }: Context
    ) => {
      return prisma.user.update({
        where: { id },
        data: input,
        include: { rides: true },
      });
    },

    deleteUser: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      try {
        await prisma.user.delete({
          where: { id },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
  },

  User: {
    rides: async (parent: any, _: any, { prisma }: Context) => {
      return prisma.ride.findMany({
        where: { userId: parent.id },
      });
    },
  },
};