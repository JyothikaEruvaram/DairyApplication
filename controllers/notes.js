/*const Diary=require("../models").dairies;
console.log("Inside dao");
async function createDiary({
    user_id,note,image,
}){
    return Diary.create({
        user_id,
        note,
        image,
        
        
    });
}

module.exports = { createDiary};*/

const jwt = require('jsonwebtoken');
const jwtauthentication = require('../middlewares/auth');
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
    jwtauthentication,async(req,res)=>{
        const{user_id,note}=req.body;
        const newNote={
            user_id,
            note,
        };
        try{
            const findNote=await dairies.findOne({
                where:{note},
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
];

exports.editNote=[
    jwtauthentication,async(req,res)=>{
        const user_id=req.params.user_id;
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
    },
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
         const createdAt=req.params.date;
         try{
             const findNote=await dairies.findOne({
                 where:{createdAt},
             });
             return res.send({status:200,entry_data:findNote});
         }catch(error){
             return res.send({status:500,data:error.message});
         }

     }
    ]