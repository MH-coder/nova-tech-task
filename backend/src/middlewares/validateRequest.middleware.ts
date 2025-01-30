import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import { ValidateTargetType } from "../utils";

export const validateRequest =
  (
    schema: AnySchema | Partial<Record<ValidateTargetType, AnySchema>>,
    targets: ValidateTargetType[]
  ) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      // Check if schema is an object with multiple keys
      if (schema && typeof schema === "object" && !("validate" in schema)) {
        for (const target of targets) {
          if (schema[target] && req[target]) {
            req[target] = await schema[target].validate(req[target], {
              abortEarly: false,
              stripUnknown: true,
            });
          }
        }
      } else {
        // If schema is a single Yup schema
        const target = targets[0]; // Only apply to the first target in this case
        req[target] = await (schema as AnySchema).validate(req[target], {
          abortEarly: false,
          stripUnknown: true,
        });
      }

      next();
    } catch (error: any) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors || error.message,
      });
    }
  };
