
import { Router, Request, Response } from 'express';
import prisma from '@unified-workspace/database';

const router = Router();

// CREATE PROJECT
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Project name is required.' });
    }

    const project = await prisma.project.create({
      data: {
        name: name.trim(),
        description:
          typeof description === 'string' && description.trim()
            ? description.trim()
            : null,
      },
    });

    return res.status(201).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create project.' });
  }
});

// READ ALL PROJECTS
router.get('/', async (_req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch projects.' });
  }
});

// READ ONE PROJECT
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch project.' });
  }
});

// UPDATE PROJECT
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (name === undefined && description === undefined) {
      return res.status(400).json({
        error: 'Provide a name or description to update.',
      });
    }

    if (name !== undefined &&
        (typeof name !== 'string' || !name.trim())) {
      return res.status(400).json({
        error: 'Project name must be a non-empty string.',
      });
    }

    if (description !== undefined &&
        description !== null &&
        typeof description !== 'string') {
      return res.status(400).json({
        error: 'Description must be a string or null.',
      });
    }

    const data: { name?: string; description?: string | null } = {};

    if (name !== undefined) data.name = name.trim();

    if (description !== undefined) {
      data.description =
        typeof description === 'string' && description.trim()
          ? description.trim()
          : null;
    }

    const project = await prisma.project.update({
      where: { id: req.params.id },
      data,
    });

    return res.status(200).json(project);
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    console.error(error);
    return res.status(500).json({ error: 'Failed to update project.' });
  }
});

// DELETE PROJECT
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.delete({
      where: { id: req.params.id },
    });

    return res.status(200).json({
      message: 'Project deleted successfully.',
      project,
    });
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    console.error(error);
    return res.status(500).json({ error: 'Failed to delete project.' });
  }
});

export default router;
