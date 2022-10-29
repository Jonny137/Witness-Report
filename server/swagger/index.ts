import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
const router = Router();

import YAML from 'yamljs';

const swaggerDocument = YAML.load(`${__dirname}\\openapi.yaml`);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
