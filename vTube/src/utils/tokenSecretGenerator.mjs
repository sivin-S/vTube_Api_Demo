import crypto from "crypto";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";





const __filename = fileURLToPath(import.meta.url)   // Get the absolute path to the current file
const __dirname = path.dirname(__filename)   // Get the directory name of the current file


// .env file path
const envFilePath =  path.join(__dirname,'../../.env')

const accessTokenGenerator = function(){
function generateAccessToken(length=32){
  return crypto.randomBytes(length).toString("hex");
}

// default length 32
const accessToken =  generateAccessToken(32)




// Access Token Secret
fs.appendFileSync(envFilePath,`ACCESS_TOKEN_SECRET=${accessToken}`,(err)=>{
  if(!err) return console.log("Token successfully generate");
   throw new Error("Error happened during appending  file the data or file is missed", err) //development purpose
})
}

// accessTokenGenerator()


//Refresh Token Secret
function generateRefreshTokenGenerator(){
  function generateRefreshToken(length=32){
    return crypto.randomBytes(length).toString("hex");
  }
  
  fs.appendFileSync(envFilePath,`REFRESH_TOKEN_SECRET=${generateRefreshToken(32)}`,(err)=>{
    if(!err) return console.log("Token successfully generate");
     throw new Error("Error happened during appending  file the data or file is missed", err) //development purpose
  })
  
}

// generateRefreshTokenGenerator()