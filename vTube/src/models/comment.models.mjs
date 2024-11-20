import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    video:{
      type: Schema.Types.ObjectId,
      refer: 'Video'
    },
    owner:{
      type: Schema.Types.ObjectId,
      refer: 'User'
    }
  },
  {timestamps:true}
)

commentSchema.plugin(mongooseAggregatePaginate)

export const Comment = mongoose.model('Comment',commentSchema)