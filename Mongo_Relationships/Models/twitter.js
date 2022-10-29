const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/tweets')
    .then(() => {
        console.log('Mongo Connection Open!');
    })
    .catch((error) => {
        console.log('Oh, no mongo connection error :)');
        console.log(error);
    })

const userSchema = new Schema({
    username: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//     const user = new User({ username: 'amannhr', age: 25 });
//     const user = await User.findOne({ username: 'amannhr' });
//     const tweet2 = new Tweet({ text: 'Hello World!', likes: 10 });
//     tweet2.user = user;
//     tweet2.save();
//     console.log(tweet2);
//     const tweet1 = new Tweet({ text: 'I love coding!', likes: 2 });
//     tweet1.user = user;
//     user.save();
//     tweet1.save();
//     console.log('Done!');
// }

// makeTweets();

const findTweet = async () => {
    const t = await Tweet.findOne({}).populate('user');
    console.log(t);
}

findTweet();