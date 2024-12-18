const express = require('express');
const app = express();
const connectDB = require('../config/database');
const { validateSignUpData } = require('../utils/validation');
const bcrypt = require('bcrypt');
const User = require('../model/User');

app.use(express.json());

app.post('/signup', async (req, res) => {
    try {
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body; 
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser =  new User({
            firstName,
            lastName, 
            emailId,
            password: hashedPassword
        })

        const result = await newUser.save();
        console.log(result);
        if(!result) {
            res.send('User not added');
        }
        res.send('User added successfully..');
    } catch(error) {
        res.status(400).send(error.message);
    }
});

app.post('/login', async (req, res) => {
    try {   
        const { emailId, password } = req.body;
        const isValidUser = await User.findOne({emailId: emailId});
        if(!isValidUser) {
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, isValidUser.password);
        if(!isPasswordValid) {
            throw new Error(`Invalid credentials`);
        }
        res.send(isValidUser);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

connectDB()
    .then( () => {
        console.log(`Connection established`);
        app.listen(7777, () => {
            console.log(`App is running on port 7777`);
        });
    })
    .catch((error) => {
        console.log("Connection not established :",error.message);
    })