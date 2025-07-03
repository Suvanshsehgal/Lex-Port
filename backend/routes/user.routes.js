import express from 'express';
import registeruser from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registeruser);

export default router;