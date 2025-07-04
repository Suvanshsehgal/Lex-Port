import express from 'express';
import {registeruser} from '../controllers/auth.controller.js';
import {loginUser} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registeruser);
router.post('/login', loginUser);
export default router;