import express from "express";
import { imgModel } from "../db/models/image-schema.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const imgRoutes = express.Router();

imgRoutes.post("/upload-image", upload.single("image"), async (req, res) => {
  
  const imageName = req.file.filename;
  const userid=req.body.userid;
  const date=req.body.date;
 
  try {
    await imgModel.create({ 
        image: imageName ,
        userid:userid,
        date:date
    
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: err });
  }
});
imgRoutes.post("/get-image", async (req, res) => {
  try {
    
    imgModel.find({'userid':req.body.id}).then((data) => {
      
      res.json({ status: "ok", data: data });
     
    });

  } catch (err) {
    res.json({ status: err });
  }
});
export default imgRoutes;
