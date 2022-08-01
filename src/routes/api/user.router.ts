import { NextFunction, Request, Response, Router } from 'express';
import { userService } from '../../services/service.index';

const userRouter = Router();

// userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const users = await userService.getUsers();
//     res.status(200).json(users);
//   } catch (error) {
//     next(error);
//   }
// });

// userRouter.get(
//   '/:userId',
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { userId } = req.params;
//       const users = await userService.getUsersById(userId);
//       res.status(200).json(users);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

userRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password1, password2 } = req.body;
      const userInfo = { username, email, password1, password2 };
      const createdUser = await userService.create(userInfo);
      res.status(200).json(createdUser);
    } catch (error) {
      next(error);
    }
  }
);

// userRouter.put(
//   '/:userId',
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { userId } = req.params;
//       const updatedUser = await userService.update(userId, req.body);
//       res.status(200).json(updatedUser);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// userRouter.delete(
//   '/:userId',
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { userId } = req.params;
//       await userService.delete(userId);
//       res.status(200).json({ result: 'success' });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

export { userRouter };
