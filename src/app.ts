import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { PrismaClient } from '@prisma/client';

import skillsRouter from './routes/skills';
import authRouter from './routes/auth';
import softRouter from './routes/soft';
import resultsRouter from './routes/results';
import addHashRouter from './routes/create';
import { errorHandler, unknownEndpoint } from './utils/middleware';
export const prisma = new PrismaClient();

const app = express();
app.use(express.static('build'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));
app.use(cors());
//app.options('*', cors());

app.use('/api/auth', authRouter);
app.use('/api/addhash', addHashRouter);
app.use('/api/sfia', skillsRouter);
app.use('/api/results', resultsRouter);
app.use('/api/soft', softRouter);

app.get('/healthcheck', (_req, res) => {
  console.log('healthcheck');
  res.send('ok');
});

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
