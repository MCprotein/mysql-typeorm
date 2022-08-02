import { Router } from 'express';
import { userRouter } from './api/';

const apiRouter = Router();
apiRouter.use('/users', userRouter);
export { apiRouter };
