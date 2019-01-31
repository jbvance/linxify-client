import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLinkToSave } from '../actions/links';
import { isValidUrl } from '../utils';

export const NoMatch = (props) => {
    const location = props.location.pathname.replace(/^\/+/g, '');
    // Determine if user got here because they entered a valid url and (optional) category as the path
    let url = null;
    let category = null;
    let validUrl = false;

    const split = location.split('--');
    if (split.length === 2) {
        category = split[0];
        url = split[1];
    } else {
        url = split[0];
    }

    validUrl = isValidUrl(url);
    if (validUrl) {
        // if user is not logged in, save linkToSave to state and redirect to login
        // after user logs in, it will check to see if there is anything in linkToSave,
        // and if so, it will trigger the creation of the link in mongodb       
        if (!props.loggedIn) {
            // Set linkToSave state
            props.dispatch(setLinkToSave({
                url,
                category
            }));
            return <Redirect to="/"/>
         } 
    }

    return (
        <div>
            <h4>Sorry, we can't find that page, or the url you tried to save ({url}) is not formatted properly</h4>
        </div>
    );
};

const mapStateToProps = state => ({
    linkToSave: state.userLinks.linkToSave,
    loggedIn: state.auth.currentUser !== null,
})

export default connect(mapStateToProps)(NoMatch);