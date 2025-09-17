import { PrismaClient } from '@prisma/client';

const main = async () => {
  const prisma = new PrismaClient();
  console.log('PrismaClient methods:', Object.getOwnPropertyNames(PrismaClient.prototype));
  console.log('prisma instance methods:', Object.getOwnPropertyNames(prisma));
  
  const modelKeys = Object.keys(prisma).filter(key => 
    !key.startsWith('_') && 
    !['$on', '$connect', '$disconnect', '$executeRaw', '$queryRaw'].includes(key)
  );
  console.log('Available models:', modelKeys);

  // Check if we can query locations
  try {
    const location = await prisma.location.findFirst();
    console.log('Location query result:', location);
  } catch (error) {
    console.error('Error querying location:', error);
  }
};

main()
  .catch(console.error)
  .finally(() => process.exit(0));