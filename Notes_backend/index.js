require('dotenv').config()
const cors = require('cors')
const express = require('express');
const path = require('path');    
const ejs = require('ejs')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT;
const URL = process.env.URL;

mongoose.connect(URL)
.then((e)=> console.log("MongoDB Connected"))
.catch((e)=> console.error("Connection error",e))
const note = require('./models/note');

const userRoute = require('./routes/user')
const noteRoute = require('./routes/note')
const getLabel = require('./routes/getLabel')

const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const app = express();

app.set("views", __dirname + "/views");
app.set("view engine","ejs")
app.use(express.static(__dirname + "public"));
// app.set("views", path.resolve( "views"));

//middleware
app.use(cors({
    origin: "https://noted-7717.onrender.com", 
    credentials: true 
}))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./public')))

app.get('/',async(req,res)=>{
    const allNotes = await note.find({ createdBy : req.user , label : {$ne: "bin"}});
    return res.json(allNotes);
})

app.get('/:label',async(req,res)=>{
    const allNotes = await note.find({ createdBy : req.user , label : req.params.label});
    return res.render('home',{
        user: req.user,
        notes: allNotes,
    });
})

app.use('/user',userRoute) 
// If any request start with /user then use `userRoute`
app.use('/note',noteRoute) 
app.use('/getlabel', getLabel)

app.listen(PORT , ()=>console.log(`Server started at PORT:${PORT}`));

