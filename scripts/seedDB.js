const mongoose = require("mongoose");
const db = require("../models");
const axios = require("axios")
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");


db.Article.remove({})
    .then(()=>(console.log("remove all")))
    .catch((err)=>(console.log(err)))
axios({
    method: 'get',
    url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=09d4fe2e895645a8a374961714e199f4&q=sport&page=20&begin_date=20151212&end_date=20171212',
    responseType: 'json'
}).then(function(response){
    //console.log(response.data.response.docs)
    response.data.response.docs.map(article => {
        var newarticle = {}
        newarticle.title = article.headline.main
        newarticle.author = article.byline.original
        newarticle.abstract = article.abstract
        newarticle.date = article.pub_date
        newarticle.url = article.web_url
        db.Article.insertMany(newarticle)
           .then(data => {
               console.log(data + " inserted!");
              
           })
           .catch(err => {
               console.error(err);
               process.exit(1);
           });

    })
    
       
  })

