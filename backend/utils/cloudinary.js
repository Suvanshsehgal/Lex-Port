import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 🖼️ For uploading images (signatures etc.)
const uploadImage = async (filePath) => {
    try {
        if (!filePath) return null;

        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
            folder: 'signatures',
        });

        // ✅ Delete file only if it exists
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return response;
    } catch (error) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        console.error('❌ Error uploading image to Cloudinary:', error);
        return null;
    }
};

// 📄 For uploading PDFs
const uploadFileToCloudinary = async (filePath, folderName = 'documents') => {
    try {
        if (!filePath) return null;

        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: 'raw',
            folder: folderName,
        });

        // ✅ Delete file only if it exists
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return response;
    } catch (error) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        console.error('❌ Error uploading file to Cloudinary:', error);
        return null;
    }
};

export { uploadImage, uploadFileToCloudinary };
