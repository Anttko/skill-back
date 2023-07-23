/*import { PrismaClient } from '@prisma/client';
import { sfia } from '../data/sfia';
import { soft } from '../data/soft';

const prisma = new PrismaClient();

const userData = [
  {
    hashkey: '123',
  },
  {
    hashkey: 'test',
  },
];*/



/*
const sfiaResults = [
  {
    result: 'valuable',
    sfiaSkillId: 1,
    hashkeyId: '1234',
  },
];

const softResults = [
  {
    result: 'most important',
    softSkillId: 2,
    hashkeyId: '1234-123',
  },
  {
    result: 'most important',
    softSkillId: 2,
    hashkeyId: '1234-123',
  },
];*//*
async function main() {
  await prisma.skill.createMany({
    data: sfia,
    skipDuplicates: true,
  });

  await prisma.softSkill.createMany({
    data: soft,
    skipDuplicates: true,
  });
  const user = await prisma.user.createMany({
    data: userData,
    skipDuplicates: true,
  });
  /*
  const softResult = await prisma.softResults.createMany({
    data: softResults,
    skipDuplicates: true,
  });
  const result = await prisma.sfiaResults.createMany({
    data: sfiaResults,
    skipDuplicates: true,
  });*/
/*
  const userWithResults = await prisma.user.upsert({
    where: { hashkey: '12' },
    update: {},
    create: {
      hashkey: '12',
      sfiaResults: {
        create: [
          {
            result: 'most valuable',
            sfiaSkillId: 2,
          },
        ],
      },
    },
  });
  console.log(user, userWithResults);
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
*/