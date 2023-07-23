import { Request, Response, Router, RequestHandler } from 'express';
import { prisma } from '../app';
import { userExtractor } from '../utils/middleware';
import { TypedRequestBody } from '../types';
import { SfiaResult, SoftResult } from '../types';
import { addSfiaResult, addSoftResult } from '../services/resultService';
const router = Router();

router.get('/sfia', userExtractor, (async (_req: Request, res: Response) => {
  try {
    const skills = await prisma.sfiaResults.findMany({
      include: {
        sfiaid: true,
      },
    });
    res.json(skills);
  } catch (error) {
    console.error(error);
    res.status(404).send('Internal Server Error');
  }
}) as unknown as RequestHandler);

router.get('/soft', userExtractor, (async (_req: Request, res: Response) => {
  try {
    const skills = await prisma.softResults.findMany({
      include: {
        softSkillNumber: true,
      },
    });
    res.json(skills);
  } catch (error) {
    console.error(error);
    res.status(404).send('Internal Server Error');
  }
}) as unknown as RequestHandler);

router.post('/', (async (req: TypedRequestBody<{ sfia: SfiaResult[]; soft: SoftResult[] }>, res: Response) => {
  if (!req.body.sfia || !req.body.soft) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { sfia, soft } = req.body;

  try {
    const sfiaResults = await addSfiaResult(sfia);

    const softResults = await addSoftResult(soft);

    res.status(200).json({ sfiaResults, softResults });
  } catch (error) {
    console.error(error);
    res.status(404).send('Internal Server Error');
  }
}) as unknown as RequestHandler);

export default router;
