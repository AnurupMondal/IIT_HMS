import { Router } from "express";
import { createUser, loginUser, logout } from "../controllers/users.js";

const router = Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.post('/logout', logout);

router.get('/', (req, res) => {
    res.json(req.user);
});

export default router;
