// db/models/posts.js

/* ================================= setup ================================= */

const { db, TABLES } = require('../knex');


/* ============================ public methods ============================= */

/** create a post
 *  @param    {String}   title   New post title.
 *  @param    {String}   body    New post body text.
 *  @returns  {Array}            Array of 1 newly-created Post object.
*/
const createPost = (title, body) => {
    return db
        .insert({ title, body })
        .into(TABLES.POSTS)
        .returning('*');
};


/** attach a topic to a post - via join table
 *  @param    {NUmber}   post_id    Post id for join table.
 *  @param    {NUmber}   topic_id   Topic id for join table.
 *  @returns  {Array}               Array of 1 newly-created row object.
*/
const attachPostTopic = (postId, topicId) => {
    return db
        .insert({ post_id: postId, topic_id: topicId })
        .into(TABLES.TOPICS_POSTS)
        .returning(['id','post_id', 'topic_id']);
};


/** Find a post by id, populate its associated topics
 *  @param    {Number}   id   The id of the post we want.
 *  @returns  {Object}        Post plus nested array of topics.
*/
const getPostByIdWithTopics = (id) => {
    return db
        .select(`${TABLES.POSTS}.*`, `${TABLES.TOPICS}.topic as topic_name`)
        .from(TABLES.POSTS)
        .leftJoin(
            TABLES.TOPICS_POSTS,
            `${TABLES.TOPICS_POSTS}.post_id`,
            `${TABLES.POSTS}.id`
        )
        .leftJoin(
            TABLES.TOPICS,
            `${TABLES.TOPICS_POSTS}.topic_id`,
            `${TABLES.TOPICS}.id`
        )
        .where(`${TABLES.POSTS}.id`, id)
        // the above returns an array with one element for each topic.
        // Let's add some reformatting to make it useful.
        // We want a single object representing the post with a topics
        // property with an array of all associated topics.
        .then((results) => {
            return results.reduce((post, elem) => {
                if (!post.title) { post.title = elem.title; }
                if (!post.body) { post.body = elem.body; }
                if (!post.views) { post.views = elem.views; }
                if (!post.likes) { post.likes = elem.likes; }
                if (!post.topics) { post.topics = []; }
                post.topics.push(elem.topic_name);
                return post;
            }, {});
        });
};


/** Get all posts, populate their associated topics
 *  @returns   {Object}   Post plus nested array of topics.
*/
const getAllPostsWithTopics = () => {
    return db
        .select(`${TABLES.POSTS}.*`, `${TABLES.TOPICS}.topic as topic_name`)
        .from(TABLES.POSTS)
        .leftJoin(
            TABLES.TOPICS_POSTS,
            `${TABLES.TOPICS_POSTS}.post_id`,
            `${TABLES.POSTS}.id`
        )
        .leftJoin(
            TABLES.TOPICS,
            `${TABLES.TOPICS_POSTS}.topic_id`,
            `${TABLES.TOPICS}.id`
        )
        .then((results) => {
            const uniques = [];
            results.forEach(result => {
                if (uniques.indexOf(result.id) === -1) {
                    uniques.push(result.id);
                }
            });

            return uniques.map((id) => {
                let uniquePost = {};
                const topics = results
                    .reduce((acc, elem) => {
                        if (elem.id === id) { acc.push(elem.topic_name); }
                        return acc;
                    }, []);

                results.forEach((post) => {
                    if (!uniquePost.title && post.id === id)  {
                        uniquePost.title = post.title;
                    }
                    if (!uniquePost.body && post.id === id)   {
                        uniquePost.body = post.body;
                    }
                    if (!uniquePost.views && post.id === id)  {
                        uniquePost.views = post.views;
                    }
                    if (!uniquePost.likes && post.id === id)  {
                        uniquePost.likes = post.likes;
                    }
                    if (!uniquePost.topics && post.id === id) {
                        uniquePost.topics = topics;
                    }
                });

                return uniquePost;
            });

        });
};


/* ================================ exports ================================ */

module.exports = {
    createPost, attachPostTopic, getPostByIdWithTopics, getAllPostsWithTopics
};
