import userRouter from './user.js';
import roomRouter from './room.js';
import complainRouter from './complaint.js';

import { Router } from 'express';

const appRouter = Router();

appRouter.use('/user', userRouter);
appRouter.use('/complaint', complainRouter);
appRouter.use('/room', roomRouter);

/** --------------------------- REDIRECTS ----------------------------- */

appRouter.get('/', (req, res) => {
    res.redirect('/login');
});

export default appRouter;