import { prisma } from '../app';
import { Prisma } from '@prisma/client';

export type singleSfiaSkill = Prisma.PromiseReturnType<typeof findSingleSfiaSkill>;

export async function findSingleSfiaSkill(id: string) {
  const sfiaSkills = await prisma.skill.findUnique({ where: { sfiaid: id } });
  return sfiaSkills;
}
