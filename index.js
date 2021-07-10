const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/user');
const config = require('./config/key');

mongoose.connect(config.mongoURI,
 {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log('DB connected')).catch(err=>console.error(err));


app.use(express.urlencoded({extended:true})); 
app.use(express.json());
app.use(cookieParser());

app.post('/api/users/register', (req, res)=>{
    const user = new User(req.body);
    user.save((err, userData)=>{
        if(err) return res.json({succcess:false, err});
    })
    return res.status(200);
})

app.get('/', (req, res)=>{
    res.send('hello world!');
});

app.listen(5000);