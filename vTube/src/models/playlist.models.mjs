import mongoose,{Schema} from "mongoose"; 

const playListSchema = new Schema({
  videos:[
    {
      type: Schema.Types.ObjectId,
      refer: 'Video'
    }
  ],
  owner:[
   {
     type: Schema.Types.ObjectId,
     refer: 'User'
   }
  ],
  name:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  }  
},{timestamps: true}
)


export const PlayList = mongoose.model("PlayList",playListSchema)