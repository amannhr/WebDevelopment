const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '636875fdcbd98d80ed45f238',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dx8jdyxk5/image/upload/v1667911614/YelpCamp/lgfwbhioqjkn20aujfuu.jpg',
                    filename: 'YelpCamp/lgfwbhioqjkn20aujfuu',

                },
                {
                    url: 'https://res.cloudinary.com/dx8jdyxk5/image/upload/v1667911614/YelpCamp/ljb5oqonu9kmqlhzotkx.jpg',
                    filename: 'YelpCamp/ljb5oqonu9kmqlhzotkx',

                }
            ],
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo unde iste qui sed quo, perferendis saepe laudantium eum assumenda pariatur possimus voluptatum quos debitis. Iusto eum soluta quibusdam asperiores ratione!',
            price: price
        })
        await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
});