/** Node/Express Blog server / API
 *  (c) 2018 - Jay Schwane (@belcurv)
*/

/* ================================= SETUP ================================= */

require('dotenv').config();

const express      = require('express');
const bodyParser   = require('body-parser');
const morgan       = require('morgan');
const path         = require('path');
const app          = express();
const PORT         = process.env.PORT || 3000;

// routes
const apiRoutes    = require('./routes/api_routes');
const staticRoutes = require('./routes/static_routes');


/* ============================= CONFIGURATION ============================= */

// log http requests to server console
app.use(morgan('dev'));

// parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set static path
app.use(express.static(path.join(__dirname, '/client')));


/* ================================ ROUTES ================================= */

app.use('/api', apiRoutes);
app.use('/',    staticRoutes);


/* ================================ STARTUP ================================ */

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});
