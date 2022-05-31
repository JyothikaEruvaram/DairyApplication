const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const diaryDao=require("../controllers/notes");

router.post("/",jsonParser,async(req,res)=>{
    console.log("Inside diaries routes");
    console.log(req.body);
    try{
        const newDiary=await diaryDao.createDiary(req.body);
        res.json({
            message:`Created a new note for this user ${newDiary.id}`,
        })
    }
    catch(err){
        res.json({
            error: err.toString(),
        });
    }
});

module.exports = router;