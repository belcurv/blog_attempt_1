/*
   non-secured routes to serve static client SPA
*/

/* ================================= SETUP ================================= */

const router     = require('express').Router();
const staticCtrl = require('../controllers/static_ctrl');


/* ================================ ROUTES ================================= */

// Serve client frontend.
router.get('/', staticCtrl.serveClient);


/* ================================ EXPORT ================================= */

module.exports = router;
