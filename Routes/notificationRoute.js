const express = require("express");
const {subscribe,sendNotification} = require('../Controllers/webpush');

const notificationRoute = express.Router();

notificationRoute.post("/subscribe",subscribe);

notificationRoute.post("/sendNotification", sendNotification)

module.exports = notificationRoute;