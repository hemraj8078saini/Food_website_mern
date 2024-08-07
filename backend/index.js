const express = require("express");
const app = express();
const port = process.env.PORT||5000;
// const db=require("./db")  
 const mongoDB =require("./db.js")
 mongoDB();

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();

})

app.get("/", (req, res) => {
  res.send("Hello World!");
});
 app.use(express.json())
  app.use('/api',require("./Routes/CreatUser.js"))
  app.use('/api',require("./Routes/DisplayData.js"))
  app.use('/api',require("./Routes/OrderData.js"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
  console.log("hello ");