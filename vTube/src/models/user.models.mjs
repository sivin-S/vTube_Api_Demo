import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
  {
   username:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
   },
   email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
   },
   fullname:{
    type: String,
    required: true,
    index: true,
    trim: true
   },
   avatar:{
    type: String,  // cloudinary URL
    required: true
   },
   coverImage:{
    type: String, // cloudinary URL
   },
   watchHistory:[
     {
      type: Schema.Types.ObjectId,
      ref: "Video"
     }
   ],
   password:{
    type: String,
    required: [true,"password is required"],  // error message :  if the password field isn't their 
   },
   refreshToken:{
     type: String
   },
 },
 {timestamps: true} // helps to create updateAt & createdAt automatically typeof Date
)

userSchema.pre("save", async function(next){
  // if password  field isn't modified . if the password field isn't modified no need to hash
  if(!this.isModified("password")) return next()
   
  this.password = await bcrypt.hash(this.password,10)

  next()
})


//  ##  NOTE ##
//  IM : Methods and Statics
// methods -> writing multiple  instance methods

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// ### NOTE :  2 Token
// 1, Access Token they used for temporary purposes
// 2, refresh Token there are stored in db . because they are used permanent -
//          that way we can block the user we can relogin must more.
userSchema.methods.generateAccessToken=function(){
  // short lived access token
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username
    //more info  grab it from req.user
   },process.env.ACCESS_TOKEN_SECRET,{expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
}

//refresh token  . "we can forcefully logout the user"
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign({
    _id: this._id // refresh token only need id not other fields like email or username
  },process.env.REFRESH_TOKEN_SECRET,{expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
}



export const User = mongoose.model("User",userSchema)