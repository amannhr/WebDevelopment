const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log("I Love Dogs!");
    next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === "pannerTikka") {
        next();
    }
    res.send("You need a Password.");
}

// app.use((req, res, next) => {
//     console.log("THIS IS MY FIRST MIDDLEWARE!!!")
//     return next();
//     console.log("THIS IS MY FIRST MIDDLEWARE - AFTER CALLING NEXT()")
// })
// app.use((req, res, next) => {
//     console.log("THIS IS MY SECOND MIDDLEWARE!!!")
//     return next();
// })
// app.use((req, res, next) => {
//     console.log("THIS IS MY THIRD MIDDLEWARE!!!")
//     return next();
// })

app.get('/', (req, res) => {
    console.log(`Request Date : ${req.requestTime}`);
    res.send('Home Page');
})

app.get('/dogs', (req, res) => {
    console.log(`Request Date : ${req.requestTime}`);
    res.send('Woof woof!');
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('My Secret is: No Secret.');
})

app.use((req, res) => {
    res.status(404).send("Not Found!");
})
app.listen(3000, () => {
    console.log("App is running on localhost : 3000");
})