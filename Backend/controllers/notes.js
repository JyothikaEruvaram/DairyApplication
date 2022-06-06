

const jwt = require('jsonwebtoken');
const jwtauthentication = require('../middlewares/auth');
const {body,validationResult}=require('express-validator');
const dairies = require('../models').dairies;

exports.getAllDairies=[
    jwtauthentication,async(req,res)=>{
        try{
            const allDairies=await dairies.findAll();
            return res.send({ status:200,allDairies});

        }catch(error){
            return res.send({status:500,data:error.message});
        }
    }
];

exports.AddnewNote=[
    body('note')
        .isLength({min:10,max:200})
        .withMessage('note must be length of min 10 and max 200 characters'),
    jwtauthentication,async(req,res)=>{
        const{user_id,note,date}=req.body;
        const newNote={
            user_id,
            note,
            date,
        };
        const errors=validationResult(req);
        console.log(errors);
        if(!errors.isEmpty){
            res.json({status:0,debug_data:errors});
        }else{
        try{
            const findNote=await dairies.findOne({
                where:{user_id},
            });
            if(findNote){
                return res.send({status:200,data:'Note already exist'});
            }else{
                await dairies.create(newNote);
                return res.send({status:200,data:'note created successfully'});
            }
            }catch(error){
                return res.send({status:500,data:error.message});
            }
        }
    }
];

exports.editNote=[
    body('note')
        .isLength({min:10,max:200})
        .withMessage('note must contain length of min 10 and max 200 characters'),
    jwtauthentication,async(req,res)=>{
        const user_id=req.params.user_id;
        const errors=validationResult(req);
        console.log(errors);
        if(!errors.isEmpty()){
            res.json({status:0,debug_data:errors});
        }else{
        try{
            const findNote=await dairies.findOne({
                where:{user_id},
            });

            findNote.note=req.body.note;
            await findNote.save();
            return res.send({status:200,data:'note updated successfully'});

        }catch(error){
            return res.send({status:500,data:error.message});
        }
    }
}
];

exports.deleteNote = [
    jwtauthentication,
     async (req, res) => {
         const user_id = req.params.user_id;
         try {
             const findNote = await dairies.findOne({
                 where: { user_id },
             });
             await findNote.destroy();
             return res.json({ status: 200, message: 'entry Deleted successfully' });
         } catch (error) {
             return res.send({ status: 500, data: error.message });
         }
     },
 ];

 exports.viewNoteById = [
    jwtauthentication,
     async (req, res) => {
         const user_id = req.params.user_id;
         try {
             const findNote = await dairies.findOne({
                 where: { user_id },
             });
             return res.send({ status: 200, entry_data: findNote });
         } catch (err) {
             return res.send({ status: 500, data: err.message });
         }
     },
 ];

 exports.viewNoteByDate=[
     jwtauthentication,async(req,res)=>{
         console.log("inside viewNoteById");
         const date=req.params.date;
         try{
             const findNote=await dairies.findOne({
                 where:{date},
             });
             return res.send({status:200,entry_data:findNote});
         }catch(error){
             return res.send({status:500,data:error.message});
         }

     }
    ]