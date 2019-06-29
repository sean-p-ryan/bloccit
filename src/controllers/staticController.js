module.exports = {
    index(req, res, next) {
        res.render("/", { title: "Welcome to Shreddit" });
    }
}