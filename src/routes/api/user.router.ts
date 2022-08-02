import { NextFunction, Request, Response, Router } from 'express';
import { userService } from '../../services/';

const userRouter = Router();

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const users = await userService.getUserById(Number(id));
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userInfo = req.body;
      const createdUser = await userService.create(userInfo);
      res.status(200).json(createdUser);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.put(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updateInfo = req.body;
      const updatedUser = await userService.update(Number(id), updateInfo);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await userService.delete(Number(id));
      res.status(200).json({ result: 'success' });
    } catch (error) {
      next(error);
    }
  }
);

export { userRouter };
