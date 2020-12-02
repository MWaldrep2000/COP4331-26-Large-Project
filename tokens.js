const { sign } = require('jsonwebtoken');

const createAccessToken = userId => {

    return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '59m',
    })
};

const createRefreshToken = userId => {

    return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    })
};

const sendAccessToken = (res, req, accesstoken) => {

    res.send({
        accesstoken,
        email: req.body.email,
    })
}

const sendRefreshToken = (res, refreshtoken) => {
    // import Cookies from 'universal-cookie';

    
    res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/refresh_token',
    });
    // const cookies = new Cookies();
    // cookies.set('test', 'test2', {
    //     path: '/',
    //     httpOnly: false,
    // });


}

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken,
}