import { Response } from "express";
import { IKycModel, KycModel } from "../../../models";
import { File } from "formidable";
import { cloudinary, CustomRequest } from "../../../utils";

export const CreateKycController = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    const idDocument = req.body.file as File;

    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(idDocument.filepath, {
      folder: "kyc_documents", // Folder in Cloudinary
      resource_type: "auto", // Detect file type (image, pdf, etc.)
    });

    const newKyc: IKycModel = await KycModel.create({
      userId: req.user._id,
      name: req.body.name,
      idDocument: {
        filename: idDocument.originalFilename,
        contentType: idDocument.mimetype,
        fileUrl: uploadResult.secure_url, // Store the Cloudinary URL
      },
    });

    return res
      .status(201)
      .json({ message: "KYC submitted successfully", data: newKyc });
  } catch (error) {
    return res.status(400).json({ error: "Failed to submit KYC" });
  }
};
