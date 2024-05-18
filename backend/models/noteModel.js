import mongoose from 'mongoose'

const Schema = mongoose.Schema

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
      type: String,
      required: true
    }
  
}, {timestamps: true})


const Note = mongoose.model("Note", noteSchema);
export default Note;