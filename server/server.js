const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
var userController = require('./controller/user.controller');
var postController = require('./controller/post.controller');
var cors = require('cors');

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const DIR = './uploads';
 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
    	console.log(file);
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});
// Connect to mongoDB database

// Routing
// Configure port
// Listen to port

mongoose.connect( 'mongodb://localhost:27017/mysocial',{useNewUrlParser: true})
.then(() => console.log("Connected"))
.catch(err=> console.log(err));

app.use(bodyParser.json());
app.use(cors());


app.post('/users', userController.signup);
app.post('/users/login', userController.login);
app.get('/users/my-profile:myId', userController.getProfile);
app.post('/users/updateProfile', upload.single('profileImage'), userController.updateProfile);
app.get('/users/search', userController.searchUser);
app.post('/users/add-friend',userController.addFriend);





app.get('/post/:userId', postController.getPosts);
app.post('/post', upload.single('postImage'), postController.addPost);


const port = 8080;
app.listen(port);
console.log(`Server is running on port: ${port}`);

