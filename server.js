const express=require("express");
const PORT=3002;
const app=express();
const userRouter=require("./routes/users");
const noteRouter=require("./routes/note");


app.use("/users",userRouter);
app.use("/notes",noteRouter);


app.listen(PORT,()=>{
console.log("Dairy app is Up now");
});