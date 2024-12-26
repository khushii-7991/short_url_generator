const express = require('express');

const{connectToMongoDb}= require('./connect');

const urlRouter = require('./router/url');
const URL= require('./models/url');
const app = express();

connectToMongoDb('mongodb://localhost:27017/short-url')
.then(()=>console.log('mongodb connected'));

app.use(express.json());
app.use("/url", urlRouter);
app.use('/:shortId', async(req, res)=>{
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