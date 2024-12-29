const express= require('express');
const{handleGenerateNewShortUrl,handleGetAnalytics} =require('../controller/url');

const router= express.Router();

router.get('/analytics/:shortId',)
router.post("/",handleGenerateNewShortUrl,handleGetAnalytics);

module.exports = router;