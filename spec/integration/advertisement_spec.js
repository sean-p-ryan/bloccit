const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisement/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisement", () => {

    beforeEach((done) => {
        this.ad;
        sequelize.sync({ force: true }).then((res) => {
            Advertisement.create({
                title: "This is an ad.",
                description: "Ad description."
            })
                .then((ad) => {
                    console.log("ad created !!!!")
                    this.ad = ad;
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
            request.get(base, (err, res) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                done();
            });
        });
    });

    describe("GET /advertisement/new", () => {

        it("should render a new ad form", (done) => {
          request.get(`${base}new`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("New Ad");
            done();
          });
        });
    
      });
    
      describe("POST /advertisements/create", () => {
        const options = {
          url: `${base}create`,
          form: {
            title: "blink-182 songs",
            description: "What's your favorite blink-182 song?"
          }
        };
  
        it("should create a new ad and redirect", (done) => {
          request.post(options,
  //#2
            (err, res, body) => {
              Advertisement.findOne({where: {title: "blink-182 songs"}})
              .then((ad) => {
                expect(res.statusCode).toBe(303);
                expect(ad.title).toBe("blink-182 songs");
                expect(ad.description).toBe("What's your favorite blink-182 song?");
                done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
            }
          );
        });
      });
});