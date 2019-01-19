import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import { loadAuthToken } from '../local-storage';

import LoginForm from './login-form';

export function LandingPage(props) {    
    const authToken = loadAuthToken();  
    // If we are logged in redirect straight to the user's dashboard
    // If there is an authToken present, skip render for now until
    // we know if user actually needs to login. Since there is a delay
    // when checking the loggedIn prop, the <LoginForm /> component
    // renders temporarily even if already logged in. To avoid this,
    // skip the render altogether if a jwt is present, and the user will
    // be redirected to login if it turns out the jwt is not valid
    if (props.loggedIn) {
        return <Redirect to="/my" />;
    }

    return (       
        <div className="home">       
            <div className="container">
                <h2>Welcome to Linxify</h2>
                <LoginForm />
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
