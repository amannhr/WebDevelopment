const bcrypt = require('bcrypt');
// const hashPassword = async (pw) => {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(pw, salt);
//     console.log(salt);
//     console.log(hash);
// }
const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw, 12);
    console.log(hash);
}

const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log('Logged You In! Successful Match.');
    } else {
        console.log('Incorrect Password!');
    }
}
// hashPassword('apple');
// login('monkey!', '$2b$10$GOY2BAReHnfbgoWq9Nf0qOjSe4C/MQvz4kCQobqBRLPZwl1.qZ.B.');
login('apple', '$2b$12$DNh8HcJ61yS0rJlKODRPOug/GjO76ZnkVOlgxejG/zjb0.hQ1YIrK');