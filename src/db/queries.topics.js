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
  },
  updateTopic(id, updatedTopic, callback){
    return Topic.findById(id)
    .then((topic) => {
      if(!topic){
        return callback("Topic not found");
      }
//#1
      topic.update(updatedTopic, {
        fields: Object.keys(updatedTopic)
      })
      .then(() => {
        callback(null, topic);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }
}