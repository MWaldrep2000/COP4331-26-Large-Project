const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());



app.use((req, res, next) => {  
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');  
    next();
});


app.post('/api/login', async (req, res, next) => {  
    // incoming: login, password  
    // outgoing: id, firstName, lastName, error  
    var error = '';  
    const { username, password } = req.body;  
    var id = -1;  
    var fn = '';  
    var ln = '';  
    if( username.toLowerCase() == 'test' && password == 'test' )  {
        id = 1;    
        fn = 'testfirst';    
        ln = 'testlast';  
    }  else  {    
        error = 'Invalid user name/password';  
    }  
    var ret = { id:id, firstName:fn, lastName:ln, error:error};  
    res.status(200).json(ret);
});

app.post('/api/register', async (req, res, next) => {  
    // incoming: username, password  
    // outgoing: id, error  
    const { username, password } = req.body;  
    var ret = { id:id, firstName:fn, lastName:ln, error:error};  
    res.status(200).json(ret);


});


app.listen(5000);