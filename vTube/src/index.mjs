import { app } from "./app.mjs";
import dotenv from "dotenv";
import connectDB from "./db/config.mjs";


// Load environment variables from .env file
dotenv.config({
  path: "./.env",
});




connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8080, () => {
    console.log(`🙂 Server is running on port ${process.env.PORT || 3000} ✨`);
  });  
})
.catch((e)=>{
   console.log('🛑 Mongodb error >>',e);
   
})