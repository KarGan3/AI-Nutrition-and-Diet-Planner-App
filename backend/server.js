const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./MealRoutes');
const cors = require('cors');
// const bodyParser = require('body-parser');

mongoose.set("strictQuery", false);
require('dotenv').config();

app.use(express.json());
app.use(cors());

// Update in server.js
// mongoose.connect('mongodb://127.0.0.1:27017/nutritionPlannerDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to the database successfully!');
// }).catch(err => {
//   console.error('Database connection error:', err);
// });

// New DB connection (if needed to switch to 'healthtrack')
mongoose.connect('mongodb://localhost:27017/healthtrack', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a schema and model
const userSchema = new mongoose.Schema({
    currentWeight: Number,
    height: Number,
    bmi: Number,
    age: Number
});
const User = mongoose.model('User', userSchema);

// API endpoint to save user data
app.post('/api/user', async (req, res) => {
    const { currentWeight, height, bmi, age } = req.body;
    const user = new User({ currentWeight, height, bmi, age });
    try {
        await user.save();
        res.status(201).send('User data saved');
    } catch (error) {
        res.status(400).send('Error saving user data');
    }
});

// API endpoint to get user data
app.get('/api/user', async (req, res) => {
    try {
        const user = await User.findOne(); // Adjust query as needed
        res.json(user);
    } catch (error) {
        res.status(400).send('Error fetching user data');
    }
});

app.use(routes);


const PORT = process.env.port || 7000

app.listen(PORT, () => {
    console.log(`I'm listenning on port ${PORT}`)
})