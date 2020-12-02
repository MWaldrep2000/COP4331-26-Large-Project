const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const { verify } = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { hash, compare } = require('bcryptjs');
const { isAuth } = require('./isAuth.js');
const {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken,
} = require('./tokens.js');


const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cookieParser());

app.set('port', process.env.PORT || 5000);

app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;

/***********Put this line in a text file and load from there. also do gitignore on that text file***********************/

//const url = 'mongodb+srv://mwaldrep26:mwaldrep@lpcluster.awkzh.mongodb.net/G26_Database?retryWrites=true&w=majority';

//const client = new MongoClient(url);
//client.connect();

require('dotenv').config();
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
client.connect();


///////////////////////////////////////////////////
// For Heroku deployment

// Server static assets if in production
if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}


app.use((req, res, next) => {  
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');  
    next();
});

// MAYBE UNCOMMENT IF STUFF BREAKS
// app.listen(5000); // start Node + Express server on port 5000

app.post('/api/login', async (req, res, next) => 
{
    // incoming: login, password
    // outgoing: id, firstName, lastName, error

    // Create empty error variable
    var error = '';

    //req is what was sent over from the frontend
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
    var validated = -1;
    var id = 0;

    if( results.length > 0 )
    {
        flag = 1;
        email = results[0].Email;
        validated = results[0].Validated;
        id = results[0]._id;
    }
    else
    {
        id = 0;
        error = "Invalid Username/Password";
        var ret = {Flag:flag, Email:email, Validated:validated, Error:error, ID:id};
        res.status(200).json(ret);
        return;
    }


    const accesstoken = createAccessToken(id);
    const refreshToken = createRefreshToken(id);
    
    
    // put the refresh token in the DB
    const filter = {_id:results[0]._id};
    try{
        
        const updateDoc = {
            $set: {
                RefreshToken:
                    refreshToken,
            },
        }
        const results1 = await db.collection('User').updateOne(filter, updateDoc);
        error = "Successfully uploaded refresh token";
    }
    catch(e){
        error = e.toString();
    }

    // Send refresh token as cookie, access token regular
    sendRefreshToken(res, refreshToken);
    // res.cookie('refreshtoken', refreshToken, {
    //     httpOnly: false,
    //     domain: "localhost",
    //     path: '/refresh_token',
    // });

    





    //here we are returning what we got back to the function
    //So we're returning an id, a firstname, lastname and an
    //error if any
    var ret = {AccessToken : accesstoken, Flag:flag, Email:email, Validated:validated, Error:error, ID:id};
    res.status(200).json(ret);
});

// Logout API
app.post('/api/logout', async (_req, res) => {
    res.clearCookie("refreshtoken", { path: '/refresh_token'});

    return res.send({
        message: "Logged out",
    })
});

// Get a new access token with a refresh token
app.post('/refresh_token', async (req, res) => {
    console.log('in refresh token');
    const token = req.cookies.refreshtoken;

    // If no token in request, return empty access token
    if (!token) return res.send({ accesstoken: ''});

    // Verify token
    let payload = null;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        return res.send({ accesstoken: ''});
    }

    // Token verified validate user
    // Get user from db
    const db = client.db();
    const user = await db.collection('User').find({Username:login,Password:password, RefreshToken: token}).toArray();

    // if no user, return empty access token
    if (!user) return res.send({ accesstoken: '' });

    // Everything checks out!!! Let's create new tokens
    const accesstoken = createAccessToken(user._id);
    const refreshtoken = createRefreshToken(user._id);

    // Stick refresh token in DB
    const filter = {_id:user[0]._id};
    try{        
        const updateDoc = {
            $set: {
                RefreshToken:
                    refreshToken,
            },
        }
        const results1 = await db.collection('User').updateOne(filter, updateDoc);
        error = "Successfully uploaded refresh token";
    }
    catch(e){
        error = e.toString();
    }

    // Send both tokens to frontend
    sendRefreshToken(res, refreshtoken);
    return res.send({ accesstoken });
});

app.post('/api/register', async (req, res, next) => {  
    // incoming: username, password, email  
    // outgoing: id, error  

    //create empty error string
    var error = "Registration Complete";
    var validated = 0
    //req is what was sent over from the frontend
    //which is username, password and email
    const { username, password, email } = req.body;  
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

        validationCode = Math.random().toString(36).substring(2, 12).toUpperCase();
        emailMsg = 'Thank you for creating an account with Hivemind! Now that you have created your account, the next step is to ';
        emailMsg += 'validate your account. To do so, just enter the following code in the validation page.';
        emailMsg += '<br><br>Validation code: ' + validationCode;

        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        var message = "<strong>Test message<br>Hopefully it works</strong>"
        const msg = {
            to: email, // Change to your recipient
            from: 'Hivemind.Incorportated@gmail.com', // Change to your verified sender
            subject: 'Email Validation',
            text: 'and easy to do anywhere, even with Node.js',
            html: emailMsg + "<br><br>Thank you<br>Hivemind Team"
        };
        sgMail.send(msg);
        
        //create empty refresh token
        const refreshToken = "";

        //create the body for a new user to add to the Users collection
        //We dont need to add an ID since MongoDB seems to do that for us
        const newUser = {Username:username, Password:password, Validated:validated, Email:email, Code:validationCode, RefreshToken:refreshToken};

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

app.post('/api/createGroup', async (req, res, next) => {
    // incoming: userID, group name  
    // outgoing: id, error  

    //create error variables for the creation of
    //the group and the member
    var error = "";

    //req is what was sent over from the frontend
    //which is userID, and groupname
    const {userID, groupname} = req.body;

    //create the body for a new group to add to the Group Collection
    //We dont need to add an ID since MongoDB seems to do that for us
    const newGroup = {Name:groupname};
    try{
        // Authorize user
        const userAuth = isAuth(req);
        if (userAuth === null) {
            res.send({
                err: 'Access Denied',
            })
        }

         //Connect with the database
         const db = client.db();

         //before we add a group we need to see if the group already exists
         const result1 = await db.collection('Group').find({Name:groupname}).toArray();
 
         //if we get a result that means that the group already exists and we return with an error
         if(result1.length > 0)
         {
             error = "Group already Exists";
             var ret = {Error:error};
             res.status(200).json(ret);
             return;
         }
        
        //if nothing from result1 then the group does not exist yet and we can create it
        const groupResult = await db.collection('Group').insertOne(newGroup);

        //Now that the group has been created, we need to get the newly
        //created group's ID number so we can create a new member

        //So when we do db.collection().insertOne(), it returns a boolean 'acknowledged' and 
        //a field called 'insertedId' which contains the _id value of the inserted document
        groupID = groupResult.insertedId;
        role = "admin"
    
        //create the body for the new member we are creating
        const newMember = {UserID:userID, GroupID:groupID, Role:role};

        //Add the newMember to the Member Collection in the database
        const memberResult = db.collection('Member').insertOne(newMember);
    }
    catch(e){
        error = e.toString();
    }

    //Return an error if any
    var ret = {Error:error};
    res.status(200).json(ret);
});

app.post('/api/searchGroup', async (req, res, next) => {
    // incoming: search
    // outgoing: _ret[], error

    //Create empty error variable
    var error = '';

    //req is whats being sent over from the frontend
    //which is the userID, as well as what they searched
    const {search} = req.body;

    //create a new variable with the search string being trimmed down of any extra whitespace
    var _search = search.trim();
    
    try{
        // Authorize user
        const userAuth = isAuth(req);
        if (userAuth === null) {
            res.send({
                err: 'Access Denied',
            })
        }

        //Connect to the database and try to find any groups
        const db = client.db();

        //any results that show up will go into results
        //each individual index in results will the name of the group as well as the id of that group
        const results = await db.collection('Group').find({"Name":{$regex:_search+'.*', $options:'i'}}).toArray();

        //have a variable that has the length of the results
        //error contains a message of how many elements there are
        var amount = results.length;
        error = amount.toString()+" results";

        //for some reason i cant send results so i made an array that
        //will have the resuls and thats what will be sent back
        var _ret = [];
        for( var i=0; i<results.length; i++ )
        {
            _ret.push( results[i]);
        }
    }
    catch(e){
        error = e.toString()
    }
    
    var ret = {Results:_ret, Error:error};
    res.status(200).json(ret);
});

app.post('/api/readGroup', async (req, res, next) => {
    //Similar to searchGroup but instead returns every single group
    //incoming: flag and userID
    //outgoing: array with all the groups

    //Create empty error variable
    var error = '';

    //create a new variable with the search string being trimmed down of any extra whitespace
    var search = "";
    const {flag, userID} = req.body;
    //if flag equals 0 then we return everysingle group in the database

    if (flag == 0){
        try{
            // Authorize user
            const userAuth = isAuth(req);
            console.log('here');
            if (userAuth === null) {
                res.send({
                    err: 'Access Denied',
                })
            }
            //Connect to the database and try to find any groups
            const db = client.db();

            //any results that show up will go into results
            //each individual index in results will the name of the group as well as the id of that group
            const results = await db.collection('Group').find({"Name":{$regex:search+'.*', $options:'r'}}).toArray();

            
            //have a variable that has the length of the results
            //error contains a message of how many elements there are
            var amount = results.length;
            error = amount.toString()+" results";

            //for some reason i cant send results so i made an array that
            //will have the resuls and thats what will be sent back
            var _ret = [];
            for( var i=0; i<results.length; i++ )
            {
                _ret.push(results[i]);
            }
        }
        catch(e){
            error = e.toString()
        }
    }
    else{
        try{
            //Connect to the database and try to find any groups
            const db = client.db();

            //Here we're getting every group that the user is in
            const results1 = await db.collection('Member').find({"UserID":{$regex:userID+'.*', $options:'r'}}).toArray();

            //have a variable that has the length of the results
            //error contains a message of how many elements there are
            var amount = results1.length;
            error = amount.toString()+" results";

            //Create empty array that we will be adding to
            var _ret = [];

            //We need to find each of the group names that the user is in
            for (var i=0; i<results1.length; i++){
                const results2 = await db.collection('Group').find({"_id": ObjectId(results1[i].GroupID)}).toArray();

                //results2 should now have element in its array, that has an _id for the group as well as the name of the group
                _ret.push(results2[0]);
            }
        }
        catch(e){
            error = e.toString();
        }
    }
    var ret = {Results:_ret, Error:error};
    res.status(200).json(ret);
});

app.post('/api/joinGroup', async (req, res, next) => {
    //Allows a user to join a group.
    //Incoming: userID, groupID, 

    //Create empty error variable
    var error = '';

    //req is whats being sent over from the frontend
    //which is the userID, as well as the groupID
    const {userID, groupID} = req.body;

    try
    {
        // Authorize user
        const userAuth = isAuth(req);
        if (userAuth === null) 
        {
            res.send({
                err: 'Access Denied',
            })
        }

        //Connect to the database and try to find any groups
        const db = client.db();

        //any results that show up will go into results
        //each individual index in results will the name of the group as well as the id of that group
        const results = await db.collection('Member').find({"UserID":{$regex:userID+'.*', $options:'r'}}).toArray();

        //for loop to check the group ID of all the groups the user is a part of
        //if the group ID matches an existing group ID then the user is already a part of that group
        //Initially i had === in the if condition but it was producing incorrect results
        //Having == produced the correct results
        for (var i=0; i < results.length; i++){
            if (results[i].GroupID == groupID){
                error = "User is already in this group";
                var ret = {Error:error};
                res.status(200).json(ret);
                return;
            }
        }

        //if we make it here then that means the user is not in the group
        //and we can add a member document to the Member Collection
        var role = "user";
        var groupId = ObjectId(groupID);
        const newMember = {UserID:userID, GroupID:groupId, Role:role};
        const results1 = await db.collection('Member').insertOne(newMember);
        error = "Successfully joined group";
    }
    catch(e){
        error = e.toString()
    }

    var ret = {Error:error};
    res.status(200).json(ret);
});

app.post('/api/createIssue', async (req, res, next) => {
    //Incoming: memberID, groupID, topic, description, username
    //Outgoing: 

    //Create error variable
    var error = "";
    var issueID = "";
    //Get what is being sent over from the frontend
    const {userID, memberID, groupID, topic, description, username} = req.body;

    //Create the body of what will be added to the Issue Collection
    const newIssue = {MemberID:memberID, GroupID:groupID, Topic:topic, Description:description, Username:username}

    try{
        // Authorize user
        const userAuth = isAuth(req);
        if (userAuth === null) 
        {
            res.send({
                err: 'Access Denied',
            })
        }
        //Connect with the database
        const db = client.db();

        //Check if document with memberID and groupID exists in the database. if not then we cannot add the issue
        const results1 = await db.collection('Member').find({"UserID": userID, "GroupID": ObjectId(groupID)}).toArray();

        //if results1.length equal 0 then that means that userID with that groupID doesn't exist
        if (results1.length  == 0){
            error = "No document found with this userID and group ID";
            var ret = {Error:error};
            res.status(200).json(ret);
            return;
        }

        //if results1.length is not 0 then add the newIssue to the Issue collection
        const result = await db.collection('Issue').insertOne(newIssue);
        issueID = result.insertedId.toString();
    }
    catch(e){
        error = e.toString();
    }

    //Return an error if any
    var ret = {Error:error, IssueID:issueID};
    res.status(200).json(ret)
});

app.post('/api/readIssue', async (req, res, next) => {
    //Read all the issues within a specific group
    //incoming: groupID
    //outgoing: array with all the issues within a group
    //Create empty error variable
    var error = '';

    //create a new variable with the search string
    var search = "";

    const {groupID} = req.body;

    try{
        // Authorize user
        const userAuth = isAuth(req);
        if (userAuth === null) 
        {
            res.send({
                err: 'Access Denied',
            })
        }
        //Connect to the database and try to find any groups
        const db = client.db();

        //any results that show up will go into results
        //each individual index in results will the name of the group as well as the id of that group
        const results = await db.collection('Issue').find({"GroupID":groupID, "Topic":{$regex:search+'.*', $options:'r'}}).toArray();

        
        //have a variable that has the length of the results
        //error contains a message of how many elements there are
        var amount = results.length;
        error = amount.toString()+" results";

        //for some reason i cant send results so i made an array that
        //will have the results and thats what will be sent back
        var _ret = [];
        for( var i=0; i<results.length; i++ )
        {
            _ret.push(results[i]);
        }
    }
    catch(e){
        error = e.toString()
    }

    var ret = {Results:_ret, Error:error};
    res.status(200).json(ret);
});

app.post('/api/searchIssue', async (req, res, next) => {
    //Search all the issues within a specific group
    //incoming: groupID, search
    //outgoing: array with all the issues within a group
    //Create empty error variable
    var error = '';

    const {groupID, search} = req.body;

    //create a new variable with the search string being trimmed down to get rid of whitspace
    var _search = search.trim();

    try{
        // Authorize user
        const userAuth = isAuth(req);
        if (userAuth === null) 
        {
            res.send({
                err: 'Access Denied',
            })
        }
        //Connect to the database and try to find any groups
        const db = client.db();

        //any results that show up will go into results
        //each individual index in results will the name of the group as well as the id of that group
        const results = await db.collection('Issue').find({"GroupID":groupID, "Topic":{$regex:_search+'.*', $options:'i'}}).toArray();

        //if there are no results then return
        if (results.length == 0){
            error = "IssueID does not exist"
            var ret ={Error:error};
            res.status(200).json(ret);
        }
        
        //have a variable that has the length of the results
        //error contains a message of how many elements there are
        var amount = results.length;
        error = amount.toString()+" results";

        //for some reason i cant send results so i made an array that
        //will have the results and thats what will be sent back
        var _ret = [];
        for( var i=0; i<results.length; i++ )
        {
            _ret.push(results[i]);
        }
    }
    catch(e){
        error = e.toString()
    }

    var ret = {Results:_ret, Error:error};
    res.status(200).json(ret);
});

app.post('/api/replyToIssue', async (req, res, next) => {
    //Incoming: issueID, reply, username
    //Outgoing: 

    //Create error variable
    var error = "";

    //Get what is being sent over from the frontend
    const {issueID, reply, username} = req.body;

    //Create the body of what will be added to the Issue Collection
    const newReply = {IssueID:issueID, Reply:reply, Author:username};

    try{
        // Authorize user
        const userAuth = isAuth(req);
        if (userAuth === null) 
        {
            res.send({
                err: 'Access Denied',
            })
        }
        //Connect with the database
        const db = client.db();

        //if results1.length is not 0 then add the newIssue to the Issue collection
        const result = await db.collection('Reply').insertOne(newReply);
    }
    catch(e){
        error = e.toString();
    }

    //Return an error if any
    var ret = {Error:error};
    res.status(200).json(ret)
});

app.post('/api/readReplies', async (req, res, next) => {
    //Read all the replies within a given issue
    //incoming: issueID
    //outgoing: array with all the issues within a group
    //Create empty error variable
    var error = '';

    //create a new variable with the search string
    var search = "";

    const {issueID} = req.body;

    try{
        // Authorize user
        const userAuth = isAuth(req);
        if (userAuth === null) 
        {
            res.send({
                err: 'Access Denied',
            })
        }
        //Connect to the database and try to find any groups
        const db = client.db();

        //any results that show up will go into results
        //each individual index in results will have the name IssueID as well as the Reply
        const results = await db.collection('Reply').find({"IssueID":issueID, "Reply":{$regex:search+'.*', $options:'r'}}).toArray();

        //have a variable that has the length of the results
        //error contains a message of how many elements there are
        var amount = results.length;
        error = amount.toString()+" results";

        //for some reason i cant send results so i made an array that
        //will have the results and thats what will be sent back
        var _ret = [];
        for( var i=0; i<results.length; i++ )
        {
            _ret.push(results[i]);
        }

    }
    catch(e){
        error = e.toString()
    }

    var ret = {Results:_ret, Error:error};
    res.status(200).json(ret);
});

app.post('/api/readAllIssues', async (req, res, next) => {
    //Read all the issues a specific user has created within any group. 
    //incoming: userID
    //outgoing: array with all the issues
    //Create empty error variable
    var error = '';
    // var groupID = "";

    const {username} = req.body;

    try{
        // Authorize user
        const userAuth = isAuth(req);
        if (userAuth === null) 
        {
            res.send({
                err: 'Access Denied',
            })
        }
        //Connect to the database and try to find any groups
        const db = client.db();

        //any results that show up will go into results
        //each individual index in results will the name of the group as well as the id of that group
        const results = await db.collection('Issue').find({"Username":username}).toArray();

        
        //have a variable that has the length of the results
        //error contains a message of how many elements there are
        var amount = results.length;
        error = amount.toString()+" results";

        var _ret = [];
        for( var i=0; i<results.length; i++ )
        {
            _ret.push(results[i]);
        }
    }
    catch(e){
        error = e.toString()
    }

    var ret = {Results:_ret, Error:error};
    res.status(200).json(ret);
});

app.post('/api/resetPasswordLink', async (req, res, next) => {
    //Change the password to the account
    //Input: email
    //Output: error if any

    //create empty error variable
    var error = "";

    const {email} = req.body;

    try{
        // Authorize user
        // const userAuth = isAuth(req);
        // if (userAuth === null) 
        // {
        //     res.send({
        //         err: 'Access Denied',
        //     })
        // }
        //Connect with the database
        const db = client.db();

        //find the user using the email provided
        const results = await db.collection('User').find({Email:email}).toArray();

        //if no user is found
        if (results.length == 0){
            error = "User not found";
            var ret = {Error:error};
            res.status(200).json(ret);
            return;
        }

        else{
            emailMsg = 'Hello ' + email + '<br><br>';
            emailMsg += 'Someone has requested to reset your password. If this was not you then please delete this email.<br><br>';
            emailMsg += 'If you would like to reset your password, then click the link below which will take you to our website.';
            emailMsg += '<br><br>Link: <a href = https://hivemindg26.herokuapp.com/recovery/' + results[0]._id + '>';
            emailMsg += 'https://hivemindg26.herokuapp.com/recovery/' + results[0]._id +'</a>';
            
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            var message = "<strong>Test message<br>Hopefully it works</strong>"
            const msg = {
                to: email, // Change to your recipient
                from: 'Hivemind.Incorportated@gmail.com', // Change to your verified sender
                subject: 'Hivemind Password Recovery',
                text: 'and easy to do anywhere, even with Node.js',
                html: emailMsg
            };
            sgMail.send(msg);
        }
    }   
    catch(e){
        error = e.toString();
    } 

    var ret = {Error:error};
    res.status(200).json(ret);
});

app.post('/api/changePassword', async (req, res, next) => {
    //Change the password of the user
    //Incoming: userID, password
    //Outgoing: error if any

    //create empty error variable
    var error = "";

    const {userID, password} = req.body;

    const filter = {_id:ObjectId(userID)};
    try{
        // Authorize user
        const userAuth = isAuth(req);
        if (userAuth === null) 
        {
            res.send({
                err: 'Access Denied',
            })
        }
        //Connect to the database
        const db = client.db();

        const updateDoc = {
            $set: {
                Password:
                    password,
            },
        }
        const results1 = await db.collection('User').updateOne(filter, updateDoc);
        error = "Successfully changed password";
    }
    catch(e){
        error = e.toString();
    }
    var ret = {Error:error};
    res.status(200).json(ret);
});

app.post('/api/validateCode', async (req, res, next) => {
    //Check to see if validation code for account is correct
    //Incoming: userID or username (something i can search the user with), validationcode
    //Outgoing: Error

    //create empty error variable
    var error = "";

    const {username,validationcode} = req.body;

    const filter = {Username:username};

    try{
        // Authorize user
        // const userAuth = isAuth(req);
        // if (userAuth === null) 
        // {
        //     res.send({
        //         err: 'Access Denied',
        //     })
        // }
        //Connect to the database
        const db = client.db();

        //any results that show up will go into results
        //Look for any documents in the User collection that have the same username
        const results = await db.collection('User').find({"Username":username}).toArray();

        //if no user is found
        if (results.length == 0){
            error = "User not found";
            var ret = {Error:error};
            res.status(200).json(ret);
            return;
        }
        
        else{
            //if the code does not match
            if (results[0].Code != validationcode){
                error = "Incorrect validation code";
                var ret = {Error:error};
                res.status(200).json(ret);
                return;
            }
            else{
                //if we're here that means that the user was found and the code matches

                const updateDoc = {
                    $set: {
                        Validated:
                            1,
                    },
                }
                const results1 = await db.collection('User').updateOne(filter, updateDoc);
                error = "Validation success";
            }
        }
    }
    catch(e){
        error = e.toString();
    }

    var ret = {Error:error};
    res.status(200).json(ret);
});

app.post('/api/deleteGroup', async (req, res, next) => {
    //Incoming: userID, groupID
    //Outgoing: error, if any

    //create empty error variable
    var error = "";

    const {userID,groupID} = req.body;

    try{
        // Authorize user
        const userAuth = isAuth(req);
        if (userAuth === null) 
        {
            res.send({
                err: 'Access Denied',
            })
        }
        //Connect to the database
        const db = client.db();

        //any results that show up will go into results
        //Look for any documents in the Member collection that have the same UserID and GroupID
        const results = await db.collection('Member').find({"UserID":userID,"GroupID":ObjectId(groupID)}).toArray();

        if (results.length == 0){
            error = "Could not find member";
            var ret = {Error:error};
            res.status(200).json(ret);
            return;
        }
        else if (results[0].Role != "admin"){
            error = "This user does not have the correct permission to delete this group";
            var ret = {Error:error};
            res.status(200).json(ret);
            return;
        }
        else{
            // //if we're here that means the member was found and they're an admin
            //Now we need to start deleting the group
            var deletedItem = await db.collection('Group').deleteMany({_id:ObjectId(groupID)});

            error = "Deleted " +deletedItem.deletedCount+ " group(s)";

            //next we can delete the members
            deletedItem = await db.collection('Member').deleteMany({GroupID:ObjectId(groupID)});

            error += ", " +deletedItem.deletedCount+ " member(s)";

            //Before we delete the issues we need to first find them all to delete the replies
            const results1 = await db.collection('Issue').find({"GroupID":{$regex:groupID+'.*', $options:'r'}}).toArray();

            //if results.length != 0 then we know there are issues we need to delete and maybe some replies too
            if (results1.length != 0){
                var deletedReplies = 0;
                var id;
                for (var i=0; i < results1.length; i++){
                    id = results1[i]._id;
                    
                    deletedItem = await db.collection('Reply').deleteMany({IssueID:ObjectId(id).toString()});
                    deletedReplies += deletedItem.deletedCount;
                }
                //Now we have deleted all of the replies so we can now delete the issues
                deletedItem = await db.collection('Issue').deleteMany({GroupID:groupID});

                error += ", " +deletedItem.deletedCount+ " issues(s), and " +deletedReplies+ " replies";
            }

        }

    }
    catch(e){
        error = e.toString();
    }
    var ret = {Error:error};
    res.status(200).json(ret);
});

app.post('/api/leaveGroup', async (req, res, next) => {
    //Incoming: userID, groupID
    //Outgoing: error

    //create empty error variable
    var error = "";

    const {userID,groupID} = req.body;

    try{
        // Authorize user
        const userAuth = isAuth(req);
        if (userAuth === null) 
        {
            res.send({
                err: 'Access Denied',
            })
        }
        //Connect to the database
        const db = client.db();

        //any results that show up will go into results
        //Look for any documents in the Member collection that have the same UserID and GroupID
        const results = await db.collection('Member').find({"UserID":userID,"GroupID":ObjectId(groupID)}).toArray();

        if (results[0].Role == "admin"){
            error = "Admin cannot leave group";
            var ret = {Error:error};
            res.status(200).json(ret);
            return;
        }

        else{
            //user is not the admin
            var deletedItem = await db.collection('Member').deleteOne({UserID:userID,GroupID:ObjectId(groupID)});
            error = "Successfully left group";
        }
    }
    catch(e){
        error = e.toString();
    }
    var ret = {Error:error};
    res.status(200).json(ret);
});

app.listen(PORT, () =>
{
    console.log(`Server listening on port ${PORT}.`);
});