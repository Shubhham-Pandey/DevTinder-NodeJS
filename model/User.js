const mongoose = require('mongoose');
const validator = require("validator");
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email address :" + value);
            }
        } 
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password :"+value);
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!['male', 'female', 'other'].includes(value)) {
                throw new Error("Please put correct gender :"+value);
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("Not a valid URL :"+value);
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about of the user!",
    },
    skills: {
        type: [String]
    }    
},
{
    timestamps: true
}
);

const User = mongoose.model("User", userSchema);
module.exports = User;