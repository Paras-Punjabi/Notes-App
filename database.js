const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/NotesApp",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected to Database");
}).catch(error=>{
    console.log("Disconnected to Database");
    console.log(error);
})

const NotesSchema = mongoose.Schema({
    title : String,
    description:String,
    date : String,
})

const NotesData = mongoose.model('note',NotesSchema);

module.exports = NotesData;