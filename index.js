const express=require('express');
const app=express();
const connectDb=require('./util/dbConnect');
const urlRoutes=require('./routes/url.routes');

connectDb('mongodb://localhost/UrlShortener').then(()=>{
    console.log("MongoDB connected!");
})

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello");
})

app.use('/api/url',urlRoutes);

const PORT=8000;
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})