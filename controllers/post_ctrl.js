/*
   Route handlers for fetching and updating blog posts.
   Controllers handle most of the business logic of our server, but do not
   directly connect to the database. Instead they compose our model methods.
*/

/* ================================= SETUP ================================= */

// import models
const posts  = require('../db/models/posts');
const topics = require('../db/models/topics');


/* ============================ ROUTE HANDLERS ============================= */

/** Create a new post with associated topics
 *  @param    {String}   postTitle    Title of the new post.
 *  @param    {String}   postBody     Body text of the new post.
 *  @param    {Array}    topicNames   Array of topics {String}
 *  @returns  {Object}                New post object w/nested topics
*/
const createPostWithTopics = (postTitle, postBody, topicNames) => {

    let persistedTopics;
    let persistedPost;

    return topics.getTopicsByTopicList(topicNames)
        .then((existingTopics) => {
            persistedTopics = existingTopics;
            const unpersistedTopics = topicNames.filter(topic => {
                return persistedTopics
                    .map(p => p.topic)
                    .indexOf(topic) === -1;
            });
            return Promise.all(unpersistedTopics.map((topic) => {
                return topics.createTopic(topic);
            }));
        })
        .then((newTopics) => {
            if (newTopics) {
                persistedTopics = persistedTopics.concat(newTopics);
            }
            return posts.createPost(postTitle, postBody);
        })
        .then(([newPost]) => {
            persistedPost = newPost;
            const pool = persistedTopics.map((topic) => {
                return posts.attachPostTopic(persistedPost.id, topic.id);
            });
            return Promise.all(pool);
        })
        .then(() => {
            return posts.getPostByIdWithTopics(persistedPost.id);
        });
};

const getPosts = (req, res) => {
    res.status(200).send('hello from the "getPosts" endpoint!');
};


const getPostById = (postId) => {
    return posts.getPostByIdWithTopics(postId);
};


const likeOnePost = (req, res) => {
    res.status(200).send('hello from the "likeOnePost" endpoint!');
};


/* ================================ EXPORT ================================= */

module.exports = { createPostWithTopics, getPosts, getPostById, likeOnePost };
