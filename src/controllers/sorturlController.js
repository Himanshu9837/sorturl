const  shortid = require("shortid");
const  utils = require("../utils.js");
const Url = require("../models/sorturlSchema");

class Sorturl{
    async sort(req, res){
        console.log("HERE",req.body.url);
        const origUrl  = req.body.url;
        if(!req.body.url){
            return res.status(400).json('Please fill Url')
          }
        const base = `http://3.71.36.112:8000/api/url`;
      
        const urlId = shortid.generate();
        // if (utils.validateUrl(origUrl)) {
            console.log(origUrl)
          try {
            let url = await Url.findOne({ origUrl:origUrl });
            if (url) {
              res.json(url);
            } else {
              const shortUrl = `${base}/${urlId}`;
      
              url = new Url({
                origUrl,
                shortUrl,
                urlId,
                date: new Date(),
              });
      
              await url.save();
              res.json(url);
            }
          } catch (err) {
            console.log(err);
            res.status(500).json('Server Error');
          }
        // } else {
        //   res.status(400).json('Invalid Original Url');
        // }
      };
      
      async geturl(req, res) {
        try {
          const url = await Url.findOne({ urlId: req.params.id });
          console.log(url)
          if (url) {
            url.clicks++;
            url.save();
            return res.redirect(url.origUrl);
          } else res.status(404).json("Not found");
        } catch (err) {
          console.log(err);
          res.status(500).json("Server Error");
        }
      };
}
module.exports = new Sorturl();
