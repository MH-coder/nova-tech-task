import { NextFunction, Request, Response } from "express";
import formidable, { File as FormidableFile } from "formidable";

// Extend the Request interface to include the file property
declare module "express-serve-static-core" {
  interface Request {
    file?: FormidableFile;
  }
}

export const uploadMiddleware =
  (fileName: string) => (req: Request, res: Response, next: NextFunction) => {
    const form = formidable({
      keepExtensions: true,
      maxFileSize: 2 * 1024 * 1024,
    });

    // Parse the incoming request
    form.parse(req, (err, fields, files) => {
      // Convert fields object to ensure single values are not arrays
      const formattedFields: { [key: string]: any } = {};
      for (const key in fields) {
        if (Array.isArray(fields[key])) {
          formattedFields[key] = fields[key][0]; // Convert single-value fields to strings
        } else {
          formattedFields[key] = fields[key];
        }
      }

      req.body = formattedFields; // Assign the fields to the req object

      // Now assign the file to the req object
      if (files && files[fileName]) {
        req.body.file = files[fileName][0] as FormidableFile; // 'files' is an object containing uploaded files
      }

      // Proceed to the next middleware or route handler
      next();
    });
  };
