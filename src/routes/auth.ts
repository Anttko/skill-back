import jwt, { Secret } from 'jsonwebtoken';
import { Response, Router, RequestHandler } from 'express';
import { TypedRequestBody } from '../types';
const { SECRET_KEY } = process.env;
import { findUser } from '../services/userService';
import { prisma } from '../app';
const router = Router();

router.post('/', (async (req: TypedRequestBody<{ hashkey: string }>, res: Response) => {
  const { hashkey } = req.body;

  if (hashkey === undefined) {
    return res.status(401).json({ error: 'no hashkey' });
  }

  const user = await findUser(hashkey);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const userForToken = {
    user: user.hashkey,
  };

  // Token set to expire in 1 hour
  const token = jwt.sign(userForToken, SECRET_KEY as Secret, { expiresIn: 60 * 60 });
  res.status(200).send({ token, hashkeyId: user.id });
}) as unknown as RequestHandler);

router.get('/users', (async (_req: TypedRequestBody<{ hashkey: string }>, res: Response) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
}) as unknown as RequestHandler);

export default router;
