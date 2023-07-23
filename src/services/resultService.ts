import { prisma } from '../app';
import { Prisma } from '@prisma/client';
import { SfiaResult, SoftResult } from '../types';

export type addSfiaResult = Prisma.PromiseReturnType<typeof addSfiaResult>;

export async function addSfiaResult(item: SfiaResult[]) {
  const addedItem = await prisma.sfiaResults.createMany({
    data: item,
    skipDuplicates: true,
  });

  return addedItem;
}
export type addSoftResult = Prisma.PromiseReturnType<typeof addSoftResult>;

export async function addSoftResult(item: SoftResult[]) {
  const softItem = await prisma.softResults.createMany({
    data: item,
    skipDuplicates: true,
  });
  return softItem;
}
