const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config(); 
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors());
app.use(express.json());  
app.use(bodyParser.json());  
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));  

app.get('/', (req, res) => {
    res.status(200).send("hello world!");  
});


app.use('/user', require('./routes/useRouter.js'));
app.use('/api', require('./routes/taskRouter.js'));


const MONGO_URI = process.env.MANGO_URI;

if (!MONGO_URI) {
    console.error('MONGO_URI is not defined. Please check your .env file.');
    process.exit(1); 
}

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);  
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});