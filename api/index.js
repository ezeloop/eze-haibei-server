const serverless = require('serverless-http');
const { createNestServer } = require('./nest-server');
const express = require('express');

const app = express();
const whitelist = ['*'];

app.use((req, res, next) => {
  const origin = req.get('origin');
  const isWhitelisted = whitelist.includes(origin) || whitelist.includes('*');
  if (isWhitelisted) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
  }
  // Pass to next layer of middleware
  if (req.method === 'OPTIONS') res.sendStatus(200);
  else next();
});

createNestServer(app).then(() => {
  module.exports.handler = serverless(app);
});
