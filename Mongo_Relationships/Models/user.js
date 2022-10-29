const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo')
    .then(() => {
        console.log("Mongo Connection Open!");
    })
    .catch(error => {
        console.log("Oh, no mongo connection error :)");
        console.log(error);
    })

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Harry',
        last: 'Potter'
    })
    u.addresses.push({
        // _id: { id: false },
        street: '123 Hamshire St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    const res = await u.save();
    console.log(res);
}

makeUser();

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push(
        {
            street: '23 Game St.',
            city: 'New York',
            state: 'NY',
            country: 'USA'
        }
    )
    const res = await user.save();
    console.log(res);
}

addAddress('63598f434b9dbb664877a2a0');