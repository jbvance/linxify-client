import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

export const Toolbar = (props) => {   
    const logOut = () => {
        props.dispatch(clearAuth());
        clearAuthToken();
    } 
    if (props.loggedIn) {
        return (
            <nav>
                <div className="nav-wrapper top-nav">
                <Link to="/" className="brand-logo logo">Linxify</Link>
                <a href="#" className="sidenav-trigger" data-target="mobile-nav">
                    <i className="material-icons">menu</i>
                </a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/my">Your Links</Link></li>
                    <li><Link to="/links/new">Add Link</Link></li>
                    <li><Link to="/categories">Categories</Link></li>
                    <li><Link to ="/categories/new">Add category</Link></li> 
                    {props.loggedIn && <li><a href="#" onClick={logOut}>Logout</a></li>}                
                </ul>
                </div>
            </nav>
        );
    } else {
        return (
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/register">Register</Link></li>                
            </ul>
        );
    }    
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Toolbar);