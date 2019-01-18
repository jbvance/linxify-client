import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

export const SideDrawer = (props) => {

    const logOut = () => {
        props.dispatch(clearAuth());
        clearAuthToken();
    } 

    if (props.loggedIn) {
        return (
            <ul className="sidenav" id="mobile-nav">
                <li><Link to="/my">Your Links</Link></li>
                <li><Link to="/links/new">Add Link</Link></li>
                <li><Link to="/categories">Categories</Link></li>
                <li><Link to ="/categories/new">Add Category</Link></li>               
                <li><a href="#" onClick={logOut}>Logout</a></li>  
            </ul>
        );
    } else {
        return (
            <ul className="sidenav" id="mobile-nav">
                <li><Link to="/register">Register</Link></li>                
            </ul>
        );
    }
    
}   

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(SideDrawer);