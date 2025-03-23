import dotenv from "dotenv"
import cors from 'cors';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
dotenv.config();
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;
const __dirname = path.resolve();

mongoose.connect(URL)
.then((e)=> console.log("MongoDB Connected"))
.catch((e)=> console.error("Connection error",e))
import note from './models/note.js';

import userRoute from './routes/user.js';
import noteRoute from './routes/note.js';
import getLabel from './routes/getLabel.js';


import { checkForAuthenticationCookie } from './middlewares/authentication.js';

const app = express();
app.use(cors({
    origin: true,
    credentials: true 
}))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

app.get('/api',async(req,res)=>{
    const allNotes = await note.find({ createdBy : req.user , label : {$ne: "bin"}});
    return res.json(allNotes);
})

app.get('/api/:label',async(req,res)=>{
    const allNotes = await note.find({ createdBy : req.user , label : req.params.label});
    return res.render('home',{
        user: req.user,
        notes: allNotes,
    });
})

app.use('/api/user',userRoute) 
app.use('/api/note',noteRoute) 
app.use('/api/getlabel', getLabel)

if(process.env.NODE_ENV === "production"){
    console.log("production");
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    // app.use((req, res, next) => {
    //     console.log(`Request: ${req.method} ${req.url}`);
    //     next();
    // });
    app.use(express.static(path.join(__dirname, "dist"), {
        setHeaders: (res, filePath) => {
            if (filePath.endsWith(".css")) {
                res.setHeader("Content-Type", "text/css");
            } else if (filePath.endsWith(".js")) {
                res.setHeader("Content-Type", "application/javascript");
            }
        },
    }));
    app.get("*" , (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    });
}


app.listen(PORT , ()=>console.log(`Server started at PORT:${PORT}`));

