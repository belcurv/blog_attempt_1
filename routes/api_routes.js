/*
   routes to handle database queries
*/

/* ================================= SETUP ================================= */

const router = require('express').Router();


/* =========================== LOAD CONTROLLERS ============================ */

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
        .then((newPost) => res.status(200).json(newPost))
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ message: 'Error creating post...'});
        });
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
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ message: 'Error creating post...'});
        });
});


// Get a single post.
// Updates post 'reads' metadata property. Returns one blog post object.
router.get('/posts/:id', (req, res) => {
    postCtrl.getPostById(req.params.id)
        .then(post => res.status(200).json({ post }) )
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ message: 'Error creating post...'});
        });
});


// Like a post.
// Updates post 'likes' metadata property. Returns status 200 'OK' - no data.
// router.put('/posts/:id/like', postCtrl.likeOnePost);


/* ================================ EXPORT ================================= */

module.exports = router;
