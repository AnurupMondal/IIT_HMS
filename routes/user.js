import { Router } from "express";
import { createUser, loginUser } from "../controllers/users.js";

const router = Router();

router.post('/create', createUser);
router.post('/login', loginUser);

router.get('/', (req, res) => {
    res.json(req.user);
});

export default router;