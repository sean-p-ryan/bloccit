const adQueries = require("../db/queries.advertisement.js");

module.exports = {
    index(req, res, next) {
        adQueries.getAllAds((err, ads) => {
            if (err) {
                res.redirect(500, "static/index");
            } else {
                res.render("advertisement/index", { ads });
            }
        })
    },
    new(req, res, next) {
        res.render("advertisement/new");
    },
    create(req, res, next) {
        let newAd = {
            title: req.body.title,
            description: req.body.description
        };
        adQueries.addAdvertisement(newAd, (err, ad) => {
            if (err || !ad) {
                console.log("AD:", ad);
                console.log("ERROR:", err);
                res.redirect(500, "/advertisements/new");
            } else {
                res.redirect(303, `/advertisement/${ad.id}`);
            }
        });
    },
    show(req, res, next) {
        adQueries.getAd(req.params.id, (err, ad) => {
            if (err || ad == null) {
                res.redirect(404, "/");
            } else {
                res.render("/show", { ad });
            }
        });
    }
}