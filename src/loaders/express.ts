import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api';
import config from '../config';
import path from 'path';
import { isCelebrateError } from 'celebrate';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';


export default ({ app }: { app: express.Application }) => {

  const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
  
  app.get("/status", (req, res) => {
    res.status(200).end();
  });

  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  app.enable("trust proxy");

  app.use(cors());

  // Configura Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));  

  app.use(bodyParser.json());

  app.use(config.api.prefix, routes());

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    if (isCelebrateError(err)) {
      const errorBody = err.details.get('body') || err.details.get('query') || err.details.get('params');
      return res.status(400).json({
        error: 'Validation error',
        details: errorBody?.details[0].message
      });
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
