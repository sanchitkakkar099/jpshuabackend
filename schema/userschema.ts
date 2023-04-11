const mongoose = require('mongoose');

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 3,

    }, 
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});


const user = mongoose.model('user', userSchema);
export default user;


// userSchema.pre("save", async function (next) {

//     if (!this.isModified("password")) {
//         next();
//     }

//     this.password = await bcrypt.hash(this.password, 10);
// });

// userSchema.methods.getJWTToken = function () {
//     return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRE
//     });
// }

// userSchema.methods.comparePassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// }

// userSchema.methods.getResetPasswordToken = async function () {

//     // generate token
//     const resetToken = crypto.randomBytes(20).toString("hex");

//     // generate hash token and add to db
//     this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
//     this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//     return resetToken;
//}

