import cloudinary from "cloudinary";

// configaration

cloudinary.v2.config({
  cloud_name: "drkngu5na",
  api_key: "936251781353124",
  api_secret: "gv-Ty6L4emb2wEet1_r2xrJY4Qk",
});


// uplodefile on cloudinary


export const fileUpload = async(path) =>{
    const data = await cloudinary.v2.uploader.upload(path);
    return data

}
// delete file on cloudinary

export const fileDelete = async(publicId) =>{
    const data = await cloudinary.v2.uploader.destroy(publicId);


}

// get public id 
export  const getPublicIdFromUrl = (url)=>{
  const parts = url.split('/');
  const publicId = parts[parts.length - 1];
  const finalpublicId  = publicId.split(".")[0]
  return finalpublicId;
}
