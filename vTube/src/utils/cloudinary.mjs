import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

// Configuration cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// params : 'LocalFilePath' > is  local file path from multer . after file is uploaded to server local storage from the user
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      // public_id: "SampleFolder",
    });
    // log
    //  console.log("File is uploaded on cloudinary , File src : "+ response.url);

    // After file uploaded to cloudinary . Then delete the file from local storage.
    fs.unlinkSync(localFilePath);
    return response;
  } catch (err) {
    console.log("Error while uploading file to cloudinary", err);

    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("File is deleted from cloudinary", result);
  } catch (error) {
    console.log("Error while deleting file from cloudinary", error);
    throw new ApiError(
      500,
      "Something went wrong while deleting file from cloudinary"
    );
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
