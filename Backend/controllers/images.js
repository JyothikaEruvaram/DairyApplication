'use strict';
const images = require('../models').images;
const multer = require('multer');
const jwt = require('jsonwebtoken');
const jwtauthentication = require('../middlewares/auth');
const path=require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

exports.upload = multer({
    storage: storage,
    limits: { fileSize: 102400000 },
    fileFilter: (req, file, cb) => {
        console.log('File filter running..');
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))
        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('provide proper file format')
    }
}).array('file',3);

exports.multipleFileUpload = [
    jwtauthentication,
async (req, res, next) => {
    console.log('inside image upload')
    try {
        let filesArray = [];
        req.files.forEach(element => {
            const file = element.path
            filesArray.push(file);
        });
        const multipleFiles = new images({
            note_id: req.body.note_id,
            image: filesArray
        });
        await multipleFiles.save();
        res.status(201).send('Files Uploaded Successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}]

exports.getallMultipleFiles = [
    jwtauthentication,
    async (req, res, next) => {
        const note_id=req.params.note_id;
        console.log('inside getall');
        console.log(note_id)
    try {
        const files = await images.findAll(  {
                where: { note_id },
            } );
        return res.send({status:200,data:files});
    } catch (error) {
       return res.send({status:500,error:error.message});
    }
}

]