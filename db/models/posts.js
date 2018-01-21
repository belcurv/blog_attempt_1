// db/models/posts.js

/* ================================= SETUP ================================= */

const { db, TABLES } = require('../knex');


/* ============================ PRIVATE METHODS ============================ */

/** Get array of topics for a specified post ID
 *  @param    {Array}   allPosts   Input array of post objects
 *  @param    {Number}  postId     Specific post whos topics we want
 *  @returns  {Array}              Array of topics associated with a post.
*/
function getPostsTopics (allPosts, postId) {
    return allPosts.reduce((topics, post) => {
        if (post.id === postId) {
            topics.push(post.topic_name);
        }
        return topics;
    }, []);
}


/** Reduce results array, combining common elements
 *  Knex queries return arrays of results. Joins result in an array of duplicate
 *  posts, where each post is repeated for each topic associated with it.
 *  @param    {Array}         results   The raw query result set.
 *  @returns  {Array|Object}            Normally an array; obj if only a single post.
*/
function reduceResults(results) {
    const uniquePostIds = {};
    const uniquePosts   = [];

    results.forEach(post => {
        if (!uniquePostIds[post.id]) {
            uniquePostIds[post.id] = true;
            uniquePosts.push({
                id         : post.id,
                title      : post.title,
                body       : post.body,
                views      : post.views,
                likes      : post.likes,
                created_at : post.created_at,
                updated_at : post.updated_at,
                topics     : getPostsTopics(results, post.id)
            });
        }
    });

    return uniquePosts.length > 1 ? uniquePosts : uniquePosts[0];
}


/* ============================ PUBLIC METHODS ============================= */

/** Create a post
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


/** Attach a topic to a post - via join table
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


/** Find a post by id; populate its associated topics
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
        .then(reduceResults);
};


/** Get all posts; populate their associated topics
 *  @returns   {Array}   Array of post objects, each w/array of their topics.
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
        .then(reduceResults);
};


/** Increment a post's views count
 *  @param    {Number}   id   The id of the post we want.
 *  @returns  {Number}        The number of affected rows
*/
const incrementPostViews = (id) => {
    return db(TABLES.POSTS)
        .where('id', id)
        .increment('views', 1);
};


/** Increment a post's likes count
 *  @param    {Number}   id   The id of the post we want.
 *  @returns  {Number}        The number of affected rows
*/
const incrementPostLikes = (id) => {
    return db(TABLES.POSTS)
        .where('id', id)
        .increment('likes', 1);
};

/* ================================ exports ================================ */

module.exports = {
    createPost,
    attachPostTopic,
    getPostByIdWithTopics,
    getAllPostsWithTopics,
    incrementPostViews,
    incrementPostLikes
};
