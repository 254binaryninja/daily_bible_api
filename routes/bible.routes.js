import express from 'express'
import { getResponse,getContent } from '../controllers/bible.controllers.js';

const router = express.Router();

router.post('/',getResponse)
router.post('/daily-content/',getContent)

export default router