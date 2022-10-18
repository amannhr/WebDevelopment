const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

// const p = new Product(
//     {
//         name: 'Ruby Grapefruit',
//         price: 1.99,
//         category: 'fruit'
//     }
// )

// p.save().then(
//     p => {
//         console.log(p)
//     }
// ).catch(
//     e => {
//         console.log(e);
//     }
// )

const seedProducts = [
    {
        name: 'Ruby Grapefruit',
        price: 1.99,
        category: 'fruit'
    },
    {
        name: 'Lady Finger',
        price: 1.09,
        category: 'vegetable'
    },
    {
        name: 'Milk',
        price: 2.99,
        category: 'dairy'
    },
    {
        name: 'Apple',
        price: 1.90,
        category: 'fruit'
    }
]


Product.insertMany(seedProducts)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })