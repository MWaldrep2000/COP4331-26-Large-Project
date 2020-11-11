import React from 'react';
import Login from '../components/Login';
import CreateAccount from '../components/CreateAccount';




const LoginPage = ({state}) => {

    return (
        <div>
            {state === true ? <Login /> : <CreateAccount />}
        </div>
    );
}

export default LoginPage;