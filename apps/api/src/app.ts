import express, { Request, Response } from 'express';
import cors from 'cors';
import { HealthResponse } from '@unified-workspace/types';
import projectRoutes from './routes/project.routes';
import taskRoutes from './routes/task.routes';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req: Request, res: Response<HealthResponse>) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.use('/projects', projectRoutes);
app.use('/', taskRoutes);