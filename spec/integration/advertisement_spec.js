const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisement/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisement", () => {

    beforeEach((done) => {
        this.topic;
        sequelize.sync({ force: true }).then((res) => {
            Advertisement.create({
                title: "This is an ad.",
                description: "Ad description."
            })
                .then((topic) => {
                    this.topic = topic;
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
    });

    describe("GET /advertisement", () => {

        it("should return a status code 200 and all advertisements", (done) => {

            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("This is an ad.");
                expect(body).toContain("Ad description.");
                done();
            });
        });
    });
});