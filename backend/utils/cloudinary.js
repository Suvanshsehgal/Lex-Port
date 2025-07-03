import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (filePath) => {
    try {
        if (!filePath) {
            return null
        }
        const response = await cloudinary.uploader.upload(filePath,
            {
                resource_type: 'auto',
            })
        // console.log('Image uploaded successfully' , response.url);
        // fs.unlinkSync(filePath); // Remove the locally saved temporary file
        return response;
    } catch (error) {
        fs.unlinkSync(filePath);//remove the locally safe temporary file
        console.error('Error uploading image to Cloudinary:', error);
        return null;
    }
}
export {uploadImage};