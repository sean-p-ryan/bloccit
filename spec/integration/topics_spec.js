const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics/";
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;

describe("routes : topics", () => {
  beforeEach((done) => {
    this.topic;
    sequelize.sync({ force: true }).then((res) => {
      Topic.create({
        title: "JS Frameworks",
        description: "There is a lot of them"
      })
        .then((topic) => {
          this.topic = topic;
          console.log('finished sync =====================')
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });

    });
  }); 
  describe("fake stuff", () => {
    it("should be true", (done) => {
        expect(true).toBe(true);
        done();
    });
  });

  describe("GET /topics", () => {
    it("should return a status code 200 and all topics", (done) => {

      //#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Topics");
        expect(body).toContain("JS Frameworks");
        done();
      });
    });
  }); 
});