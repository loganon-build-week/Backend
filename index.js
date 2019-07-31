require('dotenv').config();
const express = require('express');
const server = require('./api/server');

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n*** Server Running on port ${port} ***\n`));