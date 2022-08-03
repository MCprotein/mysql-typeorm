import { NextFunction, Request, Response, Router } from 'express';
import { todoService } from '../../services';

const todoRouter = Router();

todoRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await todoService.gettodos();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
});

todoRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const todos = await todoService.gettodoById(Number(id));
      res.status(200).json(todos);
    } catch (error) {
      next(error);
    }
  }
);

todoRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todoInfo = req.body;
      const createdtodo = await todoService.create(todoInfo);
      res.status(200).json(createdtodo);
    } catch (error) {
      next(error);
    }
  }
);

todoRouter.put(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updateInfo = req.body;
      const updatedtodo = await todoService.update(Number(id), updateInfo);
      res.status(200).json(updatedtodo);
    } catch (error) {
      next(error);
    }
  }
);

todoRouter.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await todoService.delete(Number(id));
      res.status(200).json({ result: 'success' });
    } catch (error) {
      next(error);
    }
  }
);

export { todoRouter };
