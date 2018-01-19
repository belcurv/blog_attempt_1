/*
   route handlers for fetching and updating blog posts
*/

/* ================================= SETUP ================================= */

// import configured KnexJS module
// const knex = require('../../db/knex');


/* ============================ ROUTE HANDLERS ============================= */

const getPosts = (req, res) => {
    res.status(200).send('hello from the "getPosts" endpoint!');
};


const getOnePost = (req, res) => {
    res.status(200).send('hello from the "getOnePost" endpoint!');
};


const likeOnePost = (req, res) => {
    res.status(200).send('hello from the "likeOnePost" endpoint!');
};


/* ================================ EXPORT ================================= */

module.exports = { getPosts, getOnePost, likeOnePost };
