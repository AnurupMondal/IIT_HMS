import userRouter from './user.js';
import { Router } from 'express';

const appRouter = Router();

appRouter.use('/user', userRouter);

/** --------------------------- REDIRECTS ----------------------------- */

appRouter.get('/', (req, res) => {
    res.redirect('/login');
});

export default appRouter;