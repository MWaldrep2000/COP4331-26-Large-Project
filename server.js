const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://mwaldrep26:mwaldrep@lpcluster.awkzh.mongodb.net/G26_Database?retryWrites=true&w=majority';

const client = new MongoClient(url);
client.connect();

app.use((req, res, next) => {  
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');  
    next();
});

app.listen(5000); // start Node + Express server on port 5000

// app.post('/api/login', async (req, res, next) => {  
//     // incoming: login, password  
//     // outgoing: id, firstName, lastName, error  
//     var error = '';  
//     const { username, password } = req.body;  
//     var id = -1;  
//     var fn = '';  
//     var ln = '';  
//     if( username.toLowerCase() == 'test' && password == 'test' )  {
//         id = 1;    
//         fn = 'testfirst';    
//         ln = 'testlast';  
//     }  else  {    
//         error = 'Invalid user name/password';  
//     }  
//     var ret = { id:id, firstName:fn, lastName:ln, error:error};  
//     res.status(200).json(ret);
// });

app.post('/api/login', async (req, res, next) => 
{
    // incoming: login, password
    // outgoing: id, firstName, lastName, error

    // Create empty error variable
    var error = '';

    //req is what was sent over from the login function
    //which is login and password
    const { login, password } = req.body;

    //this is just the API so i dont have the server code here
    //but client has the all the info for the MongoDB database
    //and allows us to connect to it

    //So db.collection('Users') accesses the collection in the database
    //called Users and attempts to find a user with the login and password
    //that was sent to the API then converts all the info on that user to
    //an array
    const db = client.db();
    const results = await db.collection('User').find({Username:login,Password:password}).toArray();

    //everything down here is pretty self explanatory
    var flag = -1;
    var email = '';
    var validated = -1

    if( results.length > 0 )
    {
        flag = 1;
        email = results[0].Email;
        validated = results[0].Validated;
    }
    else
        error = "Invalid Username/Password"

    //here we are returning what we got back to the function
    //So we're returning an id, a firstname, lastname and an
    //error if any
    var ret = {Flag:flag, Email:email, Validated:validated, error:error};
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