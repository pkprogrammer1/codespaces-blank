import { PrismaClient } from '@prisma/client';

const main = async () => {
  const prisma = new PrismaClient();

  // Test if we can execute a query
  try {
    const locations = await prisma.location.findMany();
    console.log('Found locations:', locations);
  } catch (error) {
    console.error('Error querying locations:', error);
  }
};

main()
  .catch(console.error)
  .finally(() => process.exit(0));