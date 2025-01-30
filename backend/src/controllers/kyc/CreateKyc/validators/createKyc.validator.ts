import { File } from "formidable";
import { object, mixed, string } from "yup";

export const createKycValidator = object().shape({
  name: string().required("Name is required"),
  file: mixed()
    .required("Image is required")
    .test("fileType", "Unsupported file format", (value: File) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      return value && allowedTypes.includes(value.mimetype!);
    })
    .test("fileSize", "File is too large", (value: File) => {
      const maxSize = 2 * 1024 * 1024; // Max file size: 5MB
      return value && value.size <= maxSize;
    }),
});
