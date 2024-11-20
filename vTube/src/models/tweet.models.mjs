import mongoose,{Schema} from "mongoose";

const tweetSchema = new Schema(
  {
    owner:{
      type: Schema.Types.ObjectId,
      refer: 'User'
    },
    content:{
      type: String,
      required: true
    }
  }
  ,{timestamps: true}
)

export const Tweet = mongoose.model('Tweet',tweetSchema)