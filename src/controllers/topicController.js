const topicQueries = require("../db/queries.topics.js");

module.exports = {
    index(req, res, next) {
        topicQueries.getAllTopics((err, topics) => {
            if (err) {
                res.redirect(500, "static/index");
            } else {
                res.render("topics/index", { topics });
            }
        })
    },
    new(req, res, next) {
        res.render("topics/new");
    },
    update(req, res, next) {
        topicQueries.updateTopic(req.params.id, req.body, (err, topic) => {
            if (err || topic == null) {
                res.redirect(404, `/topics/${req.params.id}/edit`);
            } else {
                res.redirect(`/topics/${topic.id}`);
            }
        });
    }
}