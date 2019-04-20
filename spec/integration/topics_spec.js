const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;


describe("routes : topics", () => {
    beforeEach((done) => {
        this.topic;
        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: "JS Frameworks",
                description: "There are a lot of them"
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

    describe("GET /topics", () => {
        it("should return a status code 200 and all topics", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Topics");
                expect(body).toContain("JS Frameworks");
                done();
            });
        });
    });

    describe("GET /topics/new", () => {
        it("should render a new topic form", (done) => {
            request.get(`${base}/new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Topic");
                done();
            });
        });
    });
    describe("POST /topics/:id/update", () => {

      it("should update the topic with the given values", (done) => {
         const options = {
            url: `${base}${this.topic.id}/update`,
            form: {
              title: "JavaScript Frameworks",
              description: "There are a lot of them"
            }
          };
 //#1
          request.post(options,
            (err, res, body) => {
 
            expect(err).toBeNull();
 //#2
            Topic.findOne({
              where: { id: this.topic.id }
            })
            .then((topic) => {
              expect(topic.title).toBe("JS Frameworks");
              done();
            });
          });
      });
 
    });    
});