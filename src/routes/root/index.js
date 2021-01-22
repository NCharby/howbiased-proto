const express = require('express');
const readRoute = require('./read.route');
const indexRoute = require('./index.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/is',
        route: readRoute,
    },
    {
        path: '/',
        route: indexRoute,
    },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
