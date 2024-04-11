import { Router } from 'express';
import getMermaid from '../controller/controller.js';

const router = Router();

router.get('/:articleId', getMermaid);

export default router;