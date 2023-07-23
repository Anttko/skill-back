import { Router } from 'express';
import { prisma } from '../app';
import { Request, Response, RequestHandler } from 'express';

const router = Router();

router.get('/', (async (_req: Request, res: Response) => {
  try {
    const skills = await prisma.softSkill.findMany();
    res.json(skills);
  } catch (error) {
    console.error(error);
    res.status(404).send('Internal Server Error');
  }
}) as unknown as RequestHandler);

export default router;
