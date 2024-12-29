const {nanoid }= require("nanoid");
const URL= require('../models/url');

async function handleGenerateNewShortUrl(req, res){
    const body= req.body;
    if(!body.redirectURL) return res.status(400).json({error:'url is required'});
        const shortId=nanoid(8);
        console.log(shortId);
        

        await URL.create({
            shortiD:shortId,
            redirectURL: body.redirectURL,
            visitHistory:[],
        });
        return res.render('home',{
            id: shortId,
        })

        //not to return json response
      //  return res.json({id: shortId})
}

async function handleGetAnalytics(req, res){
    const shortId= req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalclickcount: result.visitHistory.length, analytics: result.visitHistory})
}

module.exports ={
    handleGenerateNewShortUrl,
    handleGetAnalytics,
};