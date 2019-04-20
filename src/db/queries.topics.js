const Topic = require("./models").Topic;

module.exports = {

  getAllTopics(callback){
    return Topic.all()
    .then((topics) => {
        console.log('Worked')
      callback(null, topics);
    })
    .catch((err) => {
      console.log(err)
      callback(err);
    })
  }
}