const router = require('express').Router();

// Our resource routes
(require('./routes/users'))(router);
(require('./routes/sessions'))(router);
(require('./routes/tours'))(router);

module.exports = router;