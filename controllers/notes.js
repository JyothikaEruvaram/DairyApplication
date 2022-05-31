const Diary=require("../models").dairies;
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

module.exports = { createDiary};