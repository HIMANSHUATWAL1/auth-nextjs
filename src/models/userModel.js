import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String,

    },
    forgotPasswordTokenExpire: {
        type: Date,

    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpiry: {
        type: Date,
    }

})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;