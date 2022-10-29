const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError');

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
    // res.send("You need a Password.");
    throw new AppError(401, 'Password Required');
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

app.get('/error', (req, res) => {
    chicken.fly();
})

app.get('/dogs', (req, res) => {
    console.log(`Request Date : ${req.requestTime}`);
    res.send('Woof woof!');
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('My Secret is: No Secret.');
})

app.get('/admin', (req, res) => {
    throw new AppError(403, "You are not an Admin.")
})

// app.use((err, req, res, next) => {
//     console.log("***************************************");
//     console.log("************  ERROR  ******************");
//     console.log("***************************************");
//     res.status(500).send('Oh no Error!');
// })

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong." } = err;
    res.status(status).send(message);
})

app.use((req, res) => {
    res.status(404).send("Not Found!");
})

app.listen(3000, () => {
    console.log("App is running on localhost : 3000");
})