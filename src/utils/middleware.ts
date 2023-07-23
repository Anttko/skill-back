const { SECRET } = process.env;

import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../app';
import { Prisma } from '@prisma/client';
export const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

export const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  console.error(error.message);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2025') {
      return res.status(400).send({ error: 'Duplicate entry' });
    } else if (error.code === 'P2002') {
      return res.status(404).send({ error: 'Not found' });
    } else {
      return res.status(400).send({ error: error.message });
    }
  } else if (error.name === 'TypeError') {
    return res.status(400).send({ error: error.message });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token',
    });
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired',
    });
  }
  next(error);
};

const getTokenFrom = (req: Request) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

export const tokenExtractor = (req: Request, _res: Response, next: NextFunction) => {
  const token = getTokenFrom(req);
  req.body.token = token;
  next();
};

export const userExtractor = async (req: Request, res: Response, next: NextFunction) => {
  const token = getTokenFrom(req);

  if (token) {
    const decodedToken = jwt.verify(token, SECRET as Secret) as JwtPayload;
    const { user } = decodedToken;
    if (!user) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const checkUser = await prisma.user.findUnique({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where: { hashkey: user },
    });

    req.body.user = checkUser;
  }
  next();
};
