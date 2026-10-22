
import { Router, Request, Response } from 'express';
import prisma from '@unified-workspace/database';

const router = Router();

// CREATE TASK UNDER A PROJECT
router.post('/projects/:projectId/tasks', async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority } = req.body;
    const { projectId } = req.params;

    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Task title is required.' });
    }

    if (status !== undefined &&
        !['TODO', 'IN_PROGRESS', 'DONE'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }

    if (priority !== undefined &&
        !['LOW', 'MEDIUM', 'HIGH'].includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority.' });
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        description:
          typeof description === 'string' && description.trim()
            ? description.trim()
            : null,
        status: status ?? 'TODO',
        priority: priority ?? 'MEDIUM',
        project: { connect: { id: projectId } },
      },
    });

    return res.status(201).json(task);
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error.code === 'P2025' || error.code === 'P2003')
    ) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    console.error(error);
    return res.status(500).json({ error: 'Failed to create task.' });
  }
});

// READ ALL TASKS IN A PROJECT
router.get('/projects/:projectId/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { projectId: req.params.projectId },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch tasks.' });
  }
});

// READ ONE TASK
router.get('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch task.' });
  }
});

// UPDATE TASK
router.patch('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority } = req.body;

    if (
      title === undefined &&
      description === undefined &&
      status === undefined &&
      priority === undefined
    ) {
      return res.status(400).json({
        error: 'Provide at least one field to update.',
      });
    }

    if (title !== undefined &&
        (typeof title !== 'string' || !title.trim())) {
      return res.status(400).json({ error: 'Invalid task title.' });
    }

    if (description !== undefined &&
        description !== null &&
        typeof description !== 'string') {
      return res.status(400).json({
        error: 'Description must be a string or null.',
      });
    }

    if (status !== undefined &&
        !['TODO', 'IN_PROGRESS', 'DONE'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }

    if (priority !== undefined &&
        !['LOW', 'MEDIUM', 'HIGH'].includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority.' });
    }

    const data: {
      title?: string;
      description?: string | null;
      status?: string;
      priority?: string;
    } = {};

    if (title !== undefined) data.title = title.trim();

    if (description !== undefined) {
      data.description =
        typeof description === 'string' && description.trim()
          ? description.trim()
          : null;
    }

    if (status !== undefined) data.status = status;
    if (priority !== undefined) data.priority = priority;

    const task = await prisma.task.update({
      where: { id: req.params.id },
      data,
    });

    return res.status(200).json(task);
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    console.error(error);
    return res.status(500).json({ error: 'Failed to update task.' });
  }
});

// DELETE TASK
router.delete('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const task = await prisma.task.delete({
      where: { id: req.params.id },
    });

    return res.status(200).json({
      message: 'Task deleted successfully.',
      task,
    });
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    console.error(error);
    return res.status(500).json({ error: 'Failed to delete task.' });
  }
});

export default router;
