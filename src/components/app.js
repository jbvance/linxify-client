import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter, Switch} from 'react-router-dom';

import HeaderBar from './header-bar';
import Toolbar from './toolbar';
import SideDrawer from './side-drawer';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';
import UserLinks from './user-links/user-links';
import NoMatch from './no-match';
import LinkForm from './link-form/link-form';
import {refreshAuthToken} from '../actions/auth';
import { fetchUserLinks } from '../actions/links';

export class App extends React.Component {

    async componentDidMount() { 
        console.log('mounted', this.props.loggedIn);      
        if ( this.props.loggedIn && (!this.props.links || this.props.links.length === 0)) {            
            await this.props.dispatch(fetchUserLinks());
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        return (
            <div>
                <Toolbar /> 
                <SideDrawer /> 
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/register" component={RegistrationPage} />
                    <Route exact path="/my" component={UserLinks} />
                    <Route exact path="/links/new" component={LinkForm} />
                    <Route exact path="/links/edit/:linkId" component={LinkForm} />
                    <Route component={NoMatch} />
                </Switch>                             
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null,
    links: state.userLinks.links
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
