import mongoose  from 'mongoose';
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    date : String,
    todos: [{
        title:String,
        completed:Boolean
    }]
 })
 
 const Note = mongoose.model('Note',NoteSchema);

  export default Note;