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

        return res.json({id: shortId})
}

module.exports ={
    handleGenerateNewShortUrl
};