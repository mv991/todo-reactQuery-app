import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Note from './NoteSchema.js';
import mongoose from 'mongoose';
import methodOverride from 'method-override'
import 'dotenv/config';


const app = express();

app.use(bodyParser.json({limit: "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors({
    origin: '*'
}));
app.use(methodOverride('X-HTTP-Method-Override'))
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
mongoose.set('strictQuery',false)
const CONNECTION_URL =  `mongodb+srv://mahakvaid:${MONGODB_PASSWORD}@cluster0.waa9zpq.mongodb.net/project?retryWrites=true&w=majority`
const  PORT= process.env.port || 8000
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, dbName: "project"}) 
.then (() => app.listen(PORT, () => console.log("SERVER RUNNING")))
.catch((error) => console.log(error.message))

app.get('/', async(req, res) => {
    const todos = await Note.find();
    res.send(todos);

})

app.post('/',  async(req, res) => {
const todo = req.body.todo;
await Note.insertMany( {todos: todo})
const todos = await Note.find();
res.send(todos);
})

app.delete('/:id',async(req,res) => {
    const {id} = req.params;
    await Note.findByIdAndDelete(id)

})
app.patch('/:pid/:id',async(req,res) => {
    const {id,pid} = req.params;
      await Note.findOneAndUpdate(
        { _id: pid,"todos._id":id },
        { $set: { "todos.$.completed" : req.body.todo.completed}}
        
     )
})