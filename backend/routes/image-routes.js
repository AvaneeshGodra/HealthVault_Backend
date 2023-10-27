import express from "express";
import { imgModel } from "../db/models/image-schema.js";
import multer from "multer";





const imgRoutes = express.Router();

imgRoutes.post("/upload-image", async (req, res) => {
  
  const imageName = req.body.image;
  const userid=req.body.userid;
  const date=req.body.date;
 
  try {
    await imgModel.create({ 
        image: imageName,
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
