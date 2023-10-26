import { orgModel } from "../db/models/organisation-schema.js";
import jwt from 'json-web-token';
import { userModel } from "../db/models/user-schema.js";
import { consultation } from "../db/models/notes-schema.js";
import { TextServiceClient } from '@google-ai/generativelanguage';
import{GoogleAuth} from 'google-auth-library'

export const orgController={
    async login(req,res){
        const body=req.body;
       const doc=await orgModel.findOne({'email':body.email}).exec();
       if(doc && doc._id){
        const plainPassword=body.password;
        const dbPassword=doc.password;
        if(plainPassword==dbPassword){
            res.json({
              'orgdata':doc,
              'message':'true'
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
    async fetch(req,res){
        
            const body=req.body;
           const doc=await userModel.findOne({'Mid':body.Mid}).exec();
           if(doc && doc._id){
                res.json({
                  "usercard":doc,
                    "true":"true"
    
                });
            }
            else{
                res.json({"usercard":'ENTER VALID USER'});
    
            }
           },

    async addconsult(req,res){
        const consult=req.body;
        try{
            const doc=await consultation.create(consult);
            if(doc && doc._id){
                res.json({message:'Note Added SuccessFully'});
            }
            else{
                res.json({message:'Problem in note adding'});
            }
        }
        catch(err){
            // console.log('Note Adding Err ', err);
            res.json({message:'Problem in note adding'});
        }
    },
    async displayconsult(req,res){
        try{
            const doc=await consultation.find({'mid':req.body.mid}).exec();
            // console.log("Doc is",doc);
            res.json({message:doc});
        }
        catch(err){
            console.log("Error in getting all notes....",err);
        }
    },




    async aimodel(req,res){
    //    res.json(req.body)
        const MODEL_NAME = "models/text-bison-001";
const API_KEY = 'AIzaSyAbhkn4KQxk8lBNtVEF3sNXV1e47SzO2Ic';

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const prompt = `AI, please consider yourself a doctor and provide a comprehensive response to the patient's symptoms, taking into account the patient's dignosis.
Refer to the patient in first person and not the third.

Patient's Current Symptoms:

[Patient describes their current symptoms here.] only metion the symptoms given by the patient in one sentence don't add anything else.

AI Doctor's Response:

Based on the patient's reported symptoms and the provided dignosis, I recommend the following:

Diagnosis:

[Provide a potential diagnosis based on the reported symptoms and dignosis only if it is a contributing factor.]

Treatment Recommendations:

Medication: [Prescribe any necessary medications, dosage, and frequency.] be presise and not vague

Lifestyle Modifications: [Recommend any lifestyle changes, such as dietary adjustments or exercise routines.]

Follow-up: Schedule a follow-up appointment to assess the patient's progress and make any necessary adjustments to the treatment plan.

Preventive Measures:

[Provide advice on preventive measures or actions the patient can take to manage their condition and improve overall health.]

Emergency Situations:

[Explain under what circumstances the patient should seek immediate medical attention or contact emergency services.]
  ${req.body.symptoms}
  ${req.body.diagnosis}
  
`;


client
  .generateText({
    model: MODEL_NAME,
    prompt: {
      text: prompt,
    },
  })
  .then((result) => {
    res.json(result);
    
  
  });
  
  
    }
}
