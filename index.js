const express=require('express');
const app=express();
const path=require('path');
const connectDb=require('./util/dbConnect');
const urlRoutes=require('./routes/url.routes');
const staticRoutes=require('./routes/static.routes');

connectDb('mongodb://localhost/UrlShortener').then(()=>{
    console.log("MongoDB connected!");
})

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

// app.get('/',(req,res)=>{
//     res.render('home');
// })
app.use('/',staticRoutes);
app.use('/api/url',urlRoutes);

const PORT=8000;
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})