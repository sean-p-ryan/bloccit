const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

    beforeEach((done) => {

        this.topic;
        this.post;
        sequelize.sync({ force: true }).then((res) => {

            Topic.create({
                title: "Favorite movies.",
                description: "These are our favorite movies.",
            })
                .then((topic) => {
                    this.topic = topic;

                    Post.create(
                        {
                            title: "The Godfather",
                            body: "The Godfather is one of our favorite movies.",
                            topicId: topic.id
                        }
                    )
                        .then((post) => {
                            this.post = post;
                            done();
                        });
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });

    });

    describe("#create()", () => {

        it("should create a topic object with a title and description", (done) => {

            Topic.create({
                title: "Favorite movies.",
                description: "These are our favorite movies."
            })
                .then((topic) => {

                    expect(topic.title).toBe("Favorite movies.");
                    expect(topic.description).toBe("These are our favorite movies.");
                    done();

                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });

        it("should not create a topic with missing title or description", (done) => {
            Topic.create({
                title: "Favorite movies."
            })
                .then((topic) => {

                    // the code in this block will not be evaluated since the validation error
                    // will skip it. Instead, we'll catch the error in the catch block below
                    // and set the expectations there

                    done();

                })
                .catch((err) => {

                    expect(err.message).toContain("Topic.description cannot be null");
                    done();

                })
        });

    });

    describe("#getPost()", () => {

        it("should return array of posts within topic in scope", (done) => {

            this.topic.getPosts()   
                .then((posts) => {
                    expect(posts[0].topicId).toBe(this.topic.id);
                    done();
                })
                .catch((err) => {
                    console.log(this.topic.posts);
                    console.log(err);
                    done();
                })

        })
    })
});