import mongoose,{Schema} from "mongoose";


const likeSchema = new Schema(
  {
     comment:
      {
        type: Schema.Types.ObjectId,
        refer: 'Comment'
      },
     video:
      {
        type: Schema.Types.ObjectId,
        refer:'Video'
      },
     likedBy:
      {
        type: Schema.Types.ObjectId,
        refer: 'User'
      },
     tweet:
       {
        type: Schema.Types.ObjectId,
         refer: 'Tweet'
       },// posts

  },
  {timestamps:true}
)

export const Like = mongoose.model("Like",likeSchema)