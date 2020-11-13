const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb');

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
    var validated = -1

    if( results.length > 0 )
    {
        flag = 1;
        email = results[0].Email;
        validated = results[0].Validated;
        id = results[0]._id;
    }
    else
        error = "Invalid Username/Password";

    //here we are returning what we got back to the function
    //So we're returning an id, a firstname, lastname and an
    //error if any
    var ret = {Flag:flag, Email:email, Validated:validated, Error:error, ID:id};
    res.status(200).json(ret);
});

app.post('/api/register', async (req, res, next) => {  
    // incoming: username, password, email  
    // outgoing: id, error  

    //create empty error string
    var error = "Registration Complete"
    var validated = 0
    //req is what was sent over from the frontend
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
    // incoming: userId, search
    // outgoing: _ret[], error

    //Create empty error variable
    var error = '';

    //req is whats being sent over from the frontend
    //which is the userID, as well as what they searched
    const {search} = req.body;

    //create a new variable with the search string being trimmed down of any extra whitespace
    var _search = search.trim();
    
    try{
        
        //Connect to the database and try to find any groups
        const db = client.db();

        //any results that show up will go into results
        //each individual index in results will the name of the group as well as the id of that group
        const results = await db.collection('Group').find({"Name":{$regex:_search+'.*', $options:'r'}}).toArray();

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

    try{
        
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
        var role = "user"
        const newMember = {UserID:userID, GroupID:groupID, Role:role};
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

});

app.post('/api/readIssue', async (req, res, next) => {

});

app.post('/api/searchIssue', async (req, res, next) => {

});

app.post('/api/replyToIssue', async (req, res, next) => {

});

app.post('/api/readReplies', async (req, res, next) => {
    
});

app.listen(5000);