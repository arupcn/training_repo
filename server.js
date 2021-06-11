'use strict';
// get the packages we need
const express = require('express'), //use to define framework
app = express(), //taking express object for whole project
route = require('./route/v1/route'), // import route.js
cors = require('cors')     // its is use for cors origin

/* *********************************************************************** */

// Route need to allow cross origin
app.use(cors({ origin: '*', credentials: true }))


// //enabling express to accept json also
app.use(express.json({ parameterLimit: 100000, limit: '500mb', extended: true }));

// use express so we can get info from POST and/or URL parameters
app.use(express.urlencoded({
    limit: '500mb', 
    type: 'application/json', 
    extended: true,
}));

//set default language
app.use(function (req, res, next) {
    const language = req.params.language || req.headers['language'];
    if (language) {
      if (Config.lang.avail_lang[req.headers.language]) {
        app.set('lang', language);
      } else {
        app.set('lang', 'en');
      }
    } else {
      // global.lng='en';
      app.set('lang', 'en');
    }
    next();
  });

  app.use('/api/v1', route);  // route url

  // export app
  module.exports = app;