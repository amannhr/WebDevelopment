const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/farm')
    .then(() => {
        console.log('Mongo Connection Open!');
    })
    .catch((error) => {
        console.log('Oh no Mongo connection error :)');
        console.log(error);
    })

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     { name: 'Lemon', price: 3.19, season: 'Summer' },
//     { name: 'Watermelon', price: 4.19, season: 'Summer' },
//     { name: 'Apple', price: 5.19, season: 'Spring' }
// ])

// const makeFarm = async () => {
//     const farm = new Farm({ name: 'Full Belly Farms', city: 'Guindea, CA' });
//     const melon = await Product.findOne({ name: 'Lemon' });
//     farm.products.push(melon);
//     await farm.save();
//     console.log(farm);
// }

// makeFarm();

const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Full Belly Farms' });
    const watermelon = await Product.findOne({ name: 'Watermelon' });
    farm.products.push(watermelon);
    await farm.save();
    console.log(farm);
}

Farm.findOne({ name: 'Full Belly Farms' })
    .populate('products')
    .then(farm => console.log(farm));