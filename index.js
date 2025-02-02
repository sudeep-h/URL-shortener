const express=require('express');
const app=express();
const path=require('path');
const cookieParser=require('cookie-parser');
const {restrictToLoggedInUserOnly,checkAuth} =require('./middlewares/authorisation');
const connectDb=require('./util/dbConnect');

const urlRoutes=require('./routes/url.routes');
const staticRoutes=require('./routes/static.routes');
const userRoutes = require('./routes/user.routes');

connectDb('mongodb://localhost/UrlShortener').then(()=>{
    console.log("MongoDB connected!");
})

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use('/',checkAuth,staticRoutes);
app.use('/api/url',restrictToLoggedInUserOnly,urlRoutes);
app.use('/api/user',userRoutes);

const PORT=8000;
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})