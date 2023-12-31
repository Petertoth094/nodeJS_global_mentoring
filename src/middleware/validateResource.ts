import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        req: req.query,
        params: req.params
      });
      return next();
    } catch (err: any) {
      return res.status(400).json({
        successful: false,
        error: err.flatten()
      });
    }
  };

export default validateResource;
