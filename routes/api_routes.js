/*
   routes to handle database queries
*/

/* ================================= SETUP ================================= */

const router = require('express').Router();


/* =========================== LOAD CONTROLLERS ============================ */

const postCtrl = require('./controllers/post_ctrl');


/* ================================ ROUTES ================================= */

// Get all posts.
// Returns an array of blog post objects
router.get('/posts', postCtrl.getPosts);


// Get a single post.
// Updates post 'reads' metadata property. Returns one blog post object.
router.get('/posts/:id', postCtrl.getOnePost);


// Like a post.
// Updates post 'likes' metadata property. Returns status 200 'OK' - no data.
router.put('/posts/:id/like', postCtrl.likeOnePost);


/* ================================ EXPORT ================================= */

module.exports = router;
