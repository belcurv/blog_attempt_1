// test/post_ctrl_spec.js
/* globals describe afterEach it beforeEach */

/* ================================= SETUP ================================= */

process.env.NODE_ENV = 'testing';

const { assert }     = require('chai');
const { db, TABLES } = require('../db/knex');
const posts          = require('../db/models/posts');
const topics         = require('../db/models/topics');
const controller     = require('../controllers/post_ctrl');

const topicName      = 'new topic';
const postTitle      = 'new post';
const postBody       = 'new post body dummy sample text.';


/* ================================= TESTS ================================= */

describe('post controller', () => {

    let postId;

    // create a topic and 2 posts
    beforeEach(() => {
        return topics.createTopic(topicName)
            .then(() => {
                return posts.createPost(postTitle, postBody);
            })
            .then(([post]) => postId = post.id)
            .then(() => {
                return posts.createPost(postTitle, postBody);
            });
    });

    afterEach(() => {
        return db(TABLES.TOPICS_POSTS).del()
            .then(() => db(TABLES.TOPICS).del())
            .then(() => db(TABLES.POSTS).del());
    });

    it('creates a new post associated with a list of topics', () => {
        const newPostTitle = 'second post';
        const newPostBody  = 'second post body text';
        const newTopicName = 'second topic';
        const topics = [topicName, newTopicName];

        return controller.createPostWithTopics(newPostTitle, newPostBody, topics)
            .then((result) => {
                assert.equal(result.title, newPostTitle);
                assert.deepEqual(result.topics, topics);
                return db
                    .select('*')
                    .from(TABLES.TOPICS)
                    .where('topic', topicName);
            })
            .then(results => {
                assert.equal(results.length, 1);
            });
    });

    it('gets all posts', () => {
        return controller.getPosts()
            .then((results) => {
                assert.equal(Array.isArray(results), true);
                assert.equal(results.length, 2);
                assert.deepEqual(results[0].title, postTitle);
                assert.deepEqual(results[0].body, postBody);
                assert.deepEqual(results[0].views, 0);
                assert.typeOf(results[0].topics, 'array');
            });
    });

    it('gets one post by id & increments its views count', () => {
        return controller.getPostById(postId)
            .then((result) => {
                assert.equal(result.title, postTitle);
                assert.equal(result.body, postBody);
                assert.equal(result.views, 1);
                assert.typeOf(result.topics, 'array');
            });
    });

    it('likes one post by id', () => {
        return controller.likeOnePost(postId)
            .then((result) => {
                assert.equal(result.title, postTitle);
                assert.equal(result.body, postBody);
                assert.equal(result.likes, 1);
            });
    });

});
