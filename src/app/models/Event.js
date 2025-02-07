import mongoose from "mongoose";
import User from "./User";
const EventSchema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId, ref:User},
  title: { type: String, required: true },
  endDate: { type:String, required: true }, 
  endTime: {type:String, required:true},  // Combined Date & Time
  description: { type: String },
  notDone:{type:Boolean, default:true,required:true}
});

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;