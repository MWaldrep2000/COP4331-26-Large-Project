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

app.post('/api/login', async (req, res, next) => 
{
    // incoming: login, password
    // outgoing: id, firstName, lastName, error

    // Create empty error variable
    var error = '';

    //req is what was sent over from the login function
    //which is login and password
    const { login, password } = req.body;

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
        id = results[0]._id;
    }
    else
        error = "Inavlid Username/Password";

    //here we are returning what we got back to the function
    //So we're returning an id, a firstname, lastname and an
    //error if any
    var ret = {Flag:flag, Email:email, Validated:validated, Error:error, ID:id};
    res.status(200).json(ret);
});

app.post('/api/register', async (req, res, next) => {  
    // incoming: username, password  
    // outgoing: id, error  

    //create empty error string
    var error = "Registration Complete"
    var validated = 0
    //req is what was sent over from the login function
    //which is username, password and email
    const { username, password, email } = req.body;  

    //create the body for a new user to add to the Users collection
    //We dont need to add an ID since MongoDB seems to do that for us
    const newUser = {Username:username, Password:password, Validated:validated, Email:email,};
    try
    {
        //Connect with the database
        const db = client.db();

        //before we add a user we need to see if the username is taken
        const result1 = await db.collection('User').find({Username:username}).toArray();

        //if we get a result that means that the username is taken and return with error
        if(result1.length > 0)
        {
            error = "Username is taken";
            var ret = {Error:error};
            res.status(200).json(ret);
            return;
        }

        //Now to see if the email is taken
        const result2 = await db.collection('User').find({Email:email}).toArray();

        //if we get a result that means that the email is taken and return with error
        if(result2.length > 0)
        {
            error = "Account with this email already exists";
            var ret = {Error:error};
            res.status(200).json(ret);
            return;
        }

        //if neither the username or email is taken, then we
        //can add the new user
        const result = db.collection('User').insertOne(newUser);
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = {Error:error};  
    res.status(200).json(ret);
});


app.listen(5000);