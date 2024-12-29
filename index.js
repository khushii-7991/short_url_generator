const express = require('express');
const path = require('path');
const{connectToMongoDb}= require('./connect');
const urlRouter = require('./router/url');
const staticRouter = require('./router/staticRouter');
const URL= require('./models/url');

const app = express();

connectToMongoDb('mongodb://localhost:27017/short-url')
.then(()=>console.log('mongodb connected'));

app.set("view engine", "ejs");
app.set('views',path.resolve("./views")); // ejs ki file yaha iss folder mai hai, ham bata rhe ye engine ko

app.use(express.json());
app.use(express.urlencoded({extended: false}));//middleware for pass the the form data
//==>> localjost:8000/url/id 


// app.get("/test",async(req, res)=>{
//     const allUrls=await URL.find({});
//     return res.render("home",{
//         urls: allUrls,
//     });
// });

app.use("/url", urlRouter);
app.use("/", staticRouter);
app.use('/url/:shortId', async(req, res)=>{
    const shortId = req.params.shortId;

 const entry = await URL.findOneAndUpdate(
    {
        shortiD: shortId
    }, {
        $push:{ 
        visitHistory: {
            timestamp: Date.now(),
        },
    },
})

if (!entry) {
    return res.status(404).json({ error: 'Short URL not found' });
}

 res.redirect(entry.redirectURL);
 
})

app.listen(8000,()=>console.log('listening port on 8000'));