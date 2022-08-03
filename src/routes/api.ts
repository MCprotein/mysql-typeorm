import { Router } from 'express';
import { userRouter, todoRouter } from './api/';

const apiRouter = Router();
apiRouter.use('/users', userRouter);
apiRouter.use('/todos', todoRouter);
export { apiRouter };
