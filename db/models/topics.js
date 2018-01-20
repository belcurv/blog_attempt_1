// db/models/topics.js

/* ================================= setup ================================= */

const { db, TABLES } = require('../knex');


/* ============================ public methods ============================= */

/** create a topic
 *  Knex/Postgres inserts return arrays, even when there's just a single
 *  element. We return just the 1st element, the new topic object.
 *  @param    {String}  topic   Name of the new topic
 *  @returns  {Object}          The newly-created topic.
*/
const createTopic = (topic) => {
    return db
        .insert({ topic })
        .into(TABLES.TOPICS)
        .returning(['id', 'topic'])
        .then(result => result[0] );
};

/** get lists of topics
 *  `whereIn` is shorthand for `.where('topic', 'in', topicList)`
 *    Syntax: `.whereIn(column, array)`
 *  @param    {Array}  topicList   List of topics to search for
 *  @returns  {Array}              Array of topics objects.
*/
const getTopicsByTopicList = (topicList) => {
    return db
        .select(['id', 'topic'])
        .from(TABLES.TOPICS)
        .whereIn('topic', topicList);
};


/* ================================ exports ================================ */

module.exports = { createTopic, getTopicsByTopicList };
