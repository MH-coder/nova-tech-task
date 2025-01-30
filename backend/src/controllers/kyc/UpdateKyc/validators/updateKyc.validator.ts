import { AnySchema, object, string } from "yup";
import { KycStatus, ValidateTargetType } from "../../../../utils";

// Schema for body validation
const bodySchema = object().shape({
  status: string()
    .oneOf([KycStatus.APPROVED, KycStatus.REJECTED])
    .required("Status is required"),
});

// Schema for query validation
const paramsSchema = object().shape({
  id: string().required("ID is required"),
});

export const updateKycValidator: Partial<
  Record<ValidateTargetType, AnySchema>
> = { body: bodySchema, params: paramsSchema };
