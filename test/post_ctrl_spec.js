// test/post_ctrl_spec.js
/* globals describe afterEach it beforeEach */

/* ================================= SETUP ================================= */

const { assert }     = require('chai');
const { db, TABLES } = require('../db/knex');
const posts          = require('../db/models/posts');
const topics         = require('../db/models/topics');
const controller     = require('../controllers/post_ctrl');

const topicName      = 'new topic';
const postTitle      = 'new post';
const postBody       = 'new post body dummy sample text.';


/* ================================= TESTS ================================= */

describe('db post controller', () => {

    let postId;

    beforeEach(() => {
        return topics.createTopic(topicName)
            .then(() => {
                return posts.createPost(postTitle, postBody);
            })
            .then(([post]) => postId = post.id);
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

    it('gets one post by id', () => {
        return controller.getPostById(postId)
            .then((result) => {
                assert.equal(result.title, postTitle);
                assert.equal(result.body, postBody);
            });
    });

});
