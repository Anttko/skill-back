import { Router } from 'express';
import { prisma } from '../app';
import { Request, Response, RequestHandler } from 'express';
import { singleSfiaSkill, findSingleSfiaSkill } from '../services/skillService';
import { TypedRequestQuery } from '../types';

const router = Router();
router.get('/', (async (req: TypedRequestQuery<{ search: string }>, res: Response) => {
  const { search } = req.query;
  try {
    const skills = await prisma.skill.findMany({});

    if (search) {
      const filteredSkills = skills.filter((skill) => {
        return skill.keywords.some((keyword) => keyword.toLowerCase().includes(search.toLowerCase()));
      });
      return res.status(200).json(filteredSkills);
    }

    res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    res.status(404).send('Internal Server Error');
  }
}) as unknown as RequestHandler);

router.get('/:id', (async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const singleSfiaSkill: singleSfiaSkill = await findSingleSfiaSkill(id);
    res.status(200).json(singleSfiaSkill);
  } catch (error) {
    console.error(error);
    res.status(404).send('Internal Server Error');
  }
}) as unknown as RequestHandler);

export default router;
