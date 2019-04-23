const Advertisement = require("./models").Advertisement;

module.exports = {

    //#1
    getAllAds(callback) {
        return Advertisement.all()

            //#2
            .then((advertisements) => {
                callback(null, advertisements);
            })
            .catch((err) => {
                callback(err);
            })
    },
    getAd(id, callback) {
        return Advertisement.findById(id)
            .then((ad) => {
                callback(null, ad);
            })
            .catch((err) => {
                callback(err);
            })
    },
    addAdvertisement(newAd, callback) {
        return Advertisement.create({
            title: newAd.title,
            description: newAd.description
        })
            .then((ad) => {
                callback(null, ad);
            })
            .catch((err) => {
                callback(err);
            })
    }
}