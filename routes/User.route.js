import express from 'express'
import { getMe, logout, signin, signup } from '../controllers/User.controller.js'
import isAuth from '../middlewares/isAuth.js';

const authRouter = express.Router()

authRouter.post('/register', signup)
authRouter.post('/login', signin)
authRouter.get('/logout', logout)
authRouter.get('/me', isAuth, getMe);

export default authRouter