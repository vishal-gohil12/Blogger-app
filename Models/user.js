const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { createToken } = require('../services/auth');

const userSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    userImgUrl: {
        type: String,
        default: 'public/images/images.png'
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const hashPass = await bcrypt.hash(user.password, 10);

    this.password = hashPass;

    next();
});

userSchema.static('matchPassAndCreateToken', async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");

    const matchPass = bcrypt.compare(password, user.password);
    if (!matchPass) {
        throw new Error("Incorrect Password");
    }

    const token = createToken(user);
    return token;
});

const User = model('user', userSchema);

module.exports = User;