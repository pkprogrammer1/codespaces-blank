import { Context } from '../context';

export const paymentResolvers = {
  Query: {
    payments: async (_: any, __: any, { prisma }: Context) => {
      return prisma.payment.findMany({
        include: {
          user: true,
          ride: true,
        },
      });
    },

    payment: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      return prisma.payment.findUnique({
        where: { id },
        include: {
          user: true,
          ride: true,
        },
      });
    },

    paymentsByUser: async (_: any, { userId }: { userId: string }, { prisma }: Context) => {
      return prisma.payment.findMany({
        where: { userId },
        include: {
          user: true,
          ride: true,
        },
      });
    },

    paymentsByRide: async (_: any, { rideId }: { rideId: string }, { prisma }: Context) => {
      return prisma.payment.findUnique({
        where: { rideId },
        include: {
          user: true,
          ride: true,
        },
      });
    },
  },

  Mutation: {
    createPayment: async (
      _: any,
      { input }: { input: { amount: number; method: string; rideId: string; userId: string } },
      { prisma }: Context
    ) => {
      // Start with PENDING status for new payments
      return prisma.payment.create({
        data: {
          amount: input.amount,
          status: 'PENDING',
          method: input.method,
          ride: { connect: { id: input.rideId } },
          user: { connect: { id: input.userId } },
        },
        include: {
          user: true,
          ride: true,
        },
      });
    },

    updatePayment: async (
      _: any,
      { id, input }: { id: string; input: { status?: string; method?: string; amount?: number } },
      { prisma }: Context
    ) => {
      return prisma.payment.update({
        where: { id },
        data: input,
        include: {
          user: true,
          ride: true,
        },
      });
    },

    deletePayment: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      try {
        await prisma.payment.delete({
          where: { id },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
  },

  // Field Resolvers
  Payment: {
    user: async (parent: any, _: any, { prisma }: Context) => {
      return prisma.user.findUnique({
        where: { id: parent.userId },
      });
    },
    ride: async (parent: any, _: any, { prisma }: Context) => {
      return prisma.ride.findUnique({
        where: { id: parent.rideId },
      });
    },
  },
};