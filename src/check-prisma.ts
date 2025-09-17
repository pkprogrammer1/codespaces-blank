import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Log out all available model names on the prisma client
const modelNames = Object.keys(prisma).filter(key => !key.startsWith('_'));
console.log('Available models:', modelNames);

prisma.$disconnect();