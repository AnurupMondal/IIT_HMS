import userRouter from './user.js';
import complainRouter from './complaint.js';
import { Router } from 'express';

const appRouter = Router();

appRouter.use('/user', userRouter);
appRouter.use('/complaint', complainRouter);

/** --------------------------- REDIRECTS ----------------------------- */

appRouter.get('/', (req, res) => {
    res.redirect('/login');
});

export default appRouter;