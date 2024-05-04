import { Router } from 'express';
import getMermaid from '../controller/controller.js';
import userIdExtractor from '../middleware/userIdExtractor.js';

const router = Router();
const MERMAID_API_ENDPOINT = 'mermaid-to-svg';

router.use(userIdExtractor);

router.get(`/:accountId/${MERMAID_API_ENDPOINT}/:articleId`, getMermaid);

export default router;