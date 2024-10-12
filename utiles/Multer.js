import multer from "multer";

// Storage configuration
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    // Use Date.now() and append the original file's name
    cb(null, Date.now() + "_" + file.originalname);
  },
});

// Multer middleware to handle single

export const carFeatureImage = multer({storage}).single("featureImage")