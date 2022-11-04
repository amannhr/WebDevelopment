const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser('thisismysecret'));

app.get('/greet', (req, res) => {
    const { name = 'no-name' } = req.cookies;
    res.send(`Hello ${name}`);
});

app.get('/setname', (req, res) => {
    res.cookie('name', 'Aman Nahar');
    res.send('Ok sent a Cookie!');
});

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true });
    res.send('Ok signed for fruit cookie!');
})

app.get('/verifyfruit', (req, res) => {
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send(req.signedCookies);
})

app.listen(3000, () => {
    console.log('Serving on localhost 3000.');
})