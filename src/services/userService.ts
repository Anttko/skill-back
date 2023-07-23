import { prisma } from '../app';
import { Prisma } from '@prisma/client';

export type singleUser = Prisma.PromiseReturnType<typeof findUser>;

export async function findUser(key: string) {
  const user = await prisma.user.findUnique({ where: { hashkey: key } });
  return user;
}
