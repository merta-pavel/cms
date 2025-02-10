import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/*async function main() {
  await prisma.article.deleteMany({});
  await prisma.user.deleteMany({});
  
  const users = await prisma.user.createMany({
    data: [
      { id: 'user1', name: 'Alice', email: 'alice@example.com' },
      { id: 'user2', name: 'Bob', email: 'bob@example.com' },
      { id: 'user3', name: 'Charlie', email: 'charlie@example.com' },
    ],
  });

  await prisma.article.createMany({
    data: [
      { title: 'First Article', content: 'Content of the first article.', authorId: 'user1' },
      { title: 'Second Article', content: 'Content of the second article.', authorId: 'user2' },
      { title: 'Third Article', content: 'Content of the third article.', authorId: 'user3' },
    ],
  });
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });*/