const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { config } = require('./config');

const PORT = 5000;
const app = express();

app.use(bodyParser.json());

app.post('/api/auth/token', function (req, res) {
    const { email, username, name } = req.body;
    const token = jwt.sign({ sub: username, email, name }, config.authJwtSecret);
    res.json({ access_token: token })
});

app.post('/api/auth/verify', function (req, res) {
    const { access_token } = req.query;
    try {
        const payload = jwt.verify(access_token, config.authJwtSecret);
        res.json({ "message" : `valid access_token`, "payload": payload});
    } catch(e) {
        res.json({ "error": "invalid access_token"});
    }
});


const server = app.listen(PORT, function () {
    console.log(`Listening http://localhost:${PORT}`);
});

