import { Router } from 'express';
import { prisma } from '../app';
import { Response, RequestHandler } from 'express';
import { TypedRequestBody } from '../types';
import { userExtractor } from '../utils/middleware';

const router = Router();

router.post('/', userExtractor, (async (req: TypedRequestBody<{ hashkey: string }>, res: Response) => {
  const { hashkey } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        hashkey: hashkey,
      },
    });
    res.json(newUser);
  } catch (error) {
    res.status(404).send('Internal Server Error');
  }
}) as unknown as RequestHandler);

export default router;
