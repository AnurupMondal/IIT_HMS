import jwt from 'jsonwebtoken'
import User from '../models/User.js'

/**
 * Middleware function to authenticate the user using a token from cookies.
 *
 * @param {Express.Request} req - The request object.
 * @param {Express.Response} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {void}
 */
const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token;
    if (token) {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        const dbUser = await User.findById(user.id)

        req.user = dbUser
    } else if(!['/signup', 'create', 'login'].some(path => req.path.includes(path))) {
        res.redirect('/login');
        return;
    }
    next()
}

export const userMiddleware = async (req, res, next) => {
    const user = req.user
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    next()
}

export default authMiddleware;