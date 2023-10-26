import { userModel } from "../db/models/user-schema.js";
import {hashing} from "../utils/encrypt.js"
import  jwt from "jsonwebtoken";
export const userController={
    async login(req,res){
        const body=req.body;
       const doc=await userModel.findOne({'Mid':body.Mid}).exec();
       if(doc && doc._id){
        const plainPassword=body.password;
        const dbPassword=doc.password;
        if(hashing.matchPassword(plainPassword,dbPassword)){
            const data = {
                    'userdata':doc,
                  'Mid': doc.Mid,
            
              };
            const authtoken = jwt.sign(data,'aaaaaa');
            const success = true;
            res.json({
              success,
              authtoken,

            });
        }
        else{
            res.json({message:'invalid userid or password'});

        }
       }
       else{
        res.json({message:'invalid userid or password'})
       }
    },
    async register(req,res){
        const userInfo=req.body;
        userInfo.password=hashing.passwordHash(userInfo.password);

        try{
        const doc=await userModel.create(userInfo);
        if(doc && doc._id){
            res.json({message:'register sucessesfully'})
        }
        else{
            res.json({message:'not registered'})
        }
    }
    catch(err){
        res.json({message:'not registered'})
        console.log(err);
    }

    },
   async verifytoken(req,res){
    try {
        const data = jwt.verify(req.body.authtoken, 'aaaaaa');
      
        res.json({data})
    } catch (error) {
        res.status(400).send({error:'please authenticate] using a valid token'})
    }
   }
   
   

   
    
}