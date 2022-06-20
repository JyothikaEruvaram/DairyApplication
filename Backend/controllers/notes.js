

const jwt = require('jsonwebtoken');
const jwtauthentication = require('../middlewares/auth');
const {body,validationResult}=require('express-validator');
const dairies = require('../models').dairies;
const multer=require('multer');
const path=require('path');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
exports.upload=multer({
    storage:storage,
    limits:{fileSize:102400000},
    fileFilter:(req,file,cb)=>{
        console.log('File filtering running..');
        const fileTypes=/jpeg|jpg|png|gif/
        const mimeType=fileTypes.test(file.mimetype);
        const extname=fileTypes.test(path.extname(file.originalname))
        if(mimeType&&extname){
            return cb(null,true);
        }
        cb('provide correct file format');
    }
}).single('image');

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
        //const user_id = req.params.user_id;
        const{user_id,note,date}=req.body;
        const newNote={
            user_id,
            note,
            date,
            //image:req.file.path
        };
        const errors=validationResult(req);
        console.log(errors);
        if(!errors.isEmpty){
            res.json({status:0,debug_data:errors});
        }else{
        try{
            const findNote=await dairies.findOne({
                where:{user_id,note},
            });
            if(findNote){
                return res.send({status:400,data:'Note already exist'});
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
        .isLength({min:5,max:200})
        .withMessage('note must contain length of min 10 and max 200 characters'),
    jwtauthentication,async(req,res)=>{
        const id=req.params.user_id;
        const errors=validationResult(req);
        console.log(errors);
        if(!errors.isEmpty()){
            res.json({status:0,debug_data:errors});
        }else{
        try{
            const findNote=await dairies.findOne({
                where:{id},
            });

            findNote.note=req.body.note;
            findNote.date=req.body.date;
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
         const id = req.params.user_id;
         try {
             const findNote = await dairies.findOne({
                 where: { id },
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
             const findNote = await dairies.findAll({
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
         console.log("inside viewNoteDate");
         const date=req.params.date;
         const user_id=req.params.user_id;
         
         try{
             const findNote=await dairies.findAll({
                 where:{date,user_id},
             });
             return res.send({status:200,entry_data:findNote});
         }catch(error){
             return res.send({status:500,data:error.message});
         }

     }
    ]