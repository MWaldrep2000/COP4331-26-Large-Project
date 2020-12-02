const { verify } = require('jsonwebtoken');

const isAuth = req => {
    const authorization = req.headers.authorization;
    if(!authorization) throw new Error("Not logged in");
    // const token = authorization.split('.')[1];
    // console.log(token);
    const { userID } = verify(authorization, process.env.ACCESS_TOKEN_SECRET);
    console.log('here');
    return userID;
}

module.exports = {
    isAuth,
}