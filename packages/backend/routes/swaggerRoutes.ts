import { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const swaggerRouter = Router();

// Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'FocusFlow API',
      version: '0.1.0',
    }
  },
  apis: ['../docs/goal.swagger.yml'], 
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);

swaggerRouter.use('/', swaggerUI.serve);
swaggerRouter.get('/', swaggerUI.setup(swaggerDocs));

export { swaggerRouter };
