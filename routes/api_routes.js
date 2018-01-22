/*
   routes to handle database queries
*/

/* ================================= SETUP ================================= */

const router   = require('express').Router();
const postCtrl = require('../controllers/post_ctrl');


/* ================================ ROUTES ================================= */

// CREATE A POST
//   Example: POST >> /api/posts
//   Secured: no
//   Expects:
//     1) request body properties : {
//          title  : String
//          body   : String
//          topics : [String]
//        }
//   Returns: JSON 'post' object on success.
//
router.post('/posts', (req, res) => {
    const postTitle  = req.body.title;
    const postBody   = req.body.body;
    const topicNames = req.body.topics;

    postCtrl.createPostWithTopics(postTitle, postBody, topicNames)
        .then((post) => res.status(200).json(post))
        .catch((err) => res.status(500).json({ message: err.message }) );
});


// GET ALL POSTS
//   Example: GET >> /api/posts
//   Secured: no
//   Expects: null
//   Returns: Array of post objects on success.
//
router.get('/posts', (req, res) => {
    postCtrl.getPosts()
        .then((posts) => res.status(200).json(posts))
        .catch((err) => res.status(500).json({ message: err.message }) );
});


// GET ONE POST
// Increments post's views counter.
//   Example: GET >> /api/posts/3
//   Secured: no
//   Expects:
//     1) request params : {
//          id : Number
//        }
//   Returns: updated post object on success.
//
router.get('/posts/:id', (req, res) => {
    postCtrl.getPostById(req.params.id)
        .then(post => res.status(200).json(post) )
        .catch((err) => res.status(404).json({ message: err.message }) );
});


// LIKE ONE POST
// Increments post's likes counter.
//   Example: PUT >> /api/posts/3/like
//   Secured: no
//   Expects:
//     1) request params : {
//          id : Number
//        }
//   Returns: updated post object on success.
//
router.put('/posts/:id/like', (req, res) => {
    postCtrl.likeOnePost(req.params.id)
        .then(data => res.status(200).json(data) )
        .catch((err) => res.status(404).json({ message: err.message }) );
});


/* ================================ EXPORT ================================= */

module.exports = router;
