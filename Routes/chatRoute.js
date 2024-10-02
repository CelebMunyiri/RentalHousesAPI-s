const { getMessages,saveMessage } = require("../Controllers/chat")
const express = require("express");

const chatRoute = express.Router();

chatRoute.get('/', getMessages)

module.exports = chatRoute;