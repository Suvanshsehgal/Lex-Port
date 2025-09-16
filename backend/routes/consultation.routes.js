import express from 'express';
import { bookConsultation } from '../controllers/consultation.controller.js';

const router = express.Router();

router.post('/book', bookConsultation);

export default router;