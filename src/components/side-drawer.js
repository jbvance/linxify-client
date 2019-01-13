import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const SideDrawer = (props) => {
    if (props.loggedIn) {
        return (
            <ul className="sidenav" id="mobile-nav">
                <li><Link to="/my">Your Links</Link></li>
                <li><Link to="/links/new">Add Link</Link></li>
                <li><Link to="/categories">Categories</Link></li>
                <li><Link to ="/categories/new"></Link></li>
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