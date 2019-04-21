const advertisementQueries = require("../db/queries.advertisement.js");

module.exports = {
    index(req, res, next) {
        advertisementQueries.getAllAds((err, ads) => {
            if (err) {
                res.redirect(500, "static/index");
            } else {
                res.render("advertisement/index", { ads });
            }
        })
    }
}