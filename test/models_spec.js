// test/models_spec.js
/* globals describe afterEach it beforeEach */

/* ================================= SETUP ================================= */

process.env.NODE_ENV = 'testing';

const { assert }     = require('chai');
const { db, TABLES } = require('../db/knex');
const posts          = require('../db/models/posts');
const topics         = require('../db/models/topics');

const topicName      = 'new topic';
const postTitle      = 'new post';
const postBody       = 'new post body dummy sample text.';


/* ================================= TESTS ================================= */

describe('db models', () => {

    afterEach(() => {
        return db(TABLES.TOPICS_POSTS).del()
            .then(() => db(TABLES.TOPICS).del())
            .then(() => db(TABLES.POSTS).del());
    });

    it('creates a new post', () => {
        return posts.createPost(postTitle, postBody)
            .then(([result]) => {
                assert.equal(result.title, postTitle);
                assert.equal(result.body, postBody);
                return db.select('*').from(TABLES.POSTS);
            })
            .then(([result]) => {
                assert.equal(result.title, postTitle);
                assert.equal(result.body, postBody);
            });
    });

    it('creates a new topic', () => {
        return topics.createTopic(topicName)
            .then((result) => {
                assert.equal(result.topic, topicName);
                return db.select('*').from(TABLES.TOPICS);
            })
            .then(([result]) => {
                assert.equal(result.topic, topicName);
            });
    });

    describe('posts and topics', () => {
        let postId;
        let topicId;

        // seed with a topic and 2 posts before each test
        beforeEach(() => {
            return topics.createTopic(topicName)
                .then((topic) => {
                    topicId = topic.id;
                    return posts.createPost(postTitle, postBody);
                })
                .then(() => posts.createPost(postTitle, postBody))
                .then(([post]) => postId = post.id);
        });

        it('attaches a post and a topic', () => {
            return posts.attachPostTopic(postId, topicId)
                .then(() => {
                    return db
                        .select('*')
                        .from(TABLES.TOPICS_POSTS)
                        .where({
                            post_id  : postId,
                            topic_id : topicId
                        });
                })
                .then(result => assert.equal(result.length, 1));
        });

        it('gets a post with all associated topics', () => {
            return posts.attachPostTopic(postId, topicId)
                .then(() => posts.getPostByIdWithTopics(postId))
                .then((result) => {
                    assert.equal(result.title, postTitle);
                    assert.deepEqual(result.topics, [topicName]);
                });
        });

        it('gets all posts with associated topics', () => {
            return posts.attachPostTopic(postId, topicId)
                .then(() => posts.getAllPostsWithTopics())
                .then((results) => {
                    assert.equal(Array.isArray(results), true);
                    assert.equal(results.length, 2);
                    assert.deepEqual(results[0].title, postTitle);
                    assert.deepEqual(results[0].body, postBody);
                    assert.deepEqual(results[0].views, 0);
                    assert.typeOf(results[0].topics, 'array');
                });
        });
    });

});
