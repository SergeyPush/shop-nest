import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const salt = await genSalt(10);
  const hashedPassword = await hash('12345', salt);

  await prisma.user.upsert({
    where: { email: 'admin@mail.com' },
    update: {},
    create: {
      email: 'admin@mail.com',
      name: 'Admin',
      password: hashedPassword,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
