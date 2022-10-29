import { Router } from 'express';
import { makeReport } from './report.controller';

const router = Router();

router.post('', makeReport);

export default router;
