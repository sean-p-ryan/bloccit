const topicQueries = require("../db/queries.topics.js");

module.exports = {
  index(req, res, next){
    topicQueries.getAllTopics((err, topics) => {
        console.log(topics + "!!!!!!!!")
        if(err){
          console.log("Internal Server Error: ")
          console.log(err);  
          console.log("\n\n");
          res.redirect(500, "static/index");
        } else {
          res.render("topics/index", {topics});
        }
     })
  },
  new(req, res, next){
    res.render("topics/new");
  }  
}