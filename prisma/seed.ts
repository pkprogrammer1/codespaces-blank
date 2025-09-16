import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      name: 'John Doe',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
    },
  });

  // Create sample rides
  await prisma.ride.create({
    data: {
      from: 'New York',
      to: 'Boston',
      price: 50.0,
      userId: user1.id,
    },
  });

  await prisma.ride.create({
    data: {
      from: 'Los Angeles',
      to: 'San Francisco',
      price: 75.0,
      userId: user2.id,
    },
  });

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });