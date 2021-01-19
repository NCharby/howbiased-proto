const express = require('express');
const readRoute = require('./read.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/is',
        route: readRoute,
    },
    // {
    //     path: '/',
    //     route: readRoute,
    // },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
