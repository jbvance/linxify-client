import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter, Switch} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import HeaderBar from './header-bar';
import Toolbar from './toolbar';
import SideDrawer from './side-drawer';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';
import UserLinks from './user-links/user-links';
import DisplayLinks from './user-links/display-links';
import NoMatch from './no-match';
import LinkForm from './link-form/link-form';
import Categories from './categories/categories';
import EditCategory from './category-form/edit-category';
import AddCategory from './category-form/add-category';
import {refreshAuthToken} from '../actions/auth';
import { fetchUserLinks } from '../actions/links';
import { fetchUserCategories } from '../actions/categories';

export class App extends React.Component {
    
    async componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }

        if ( this.props.loggedIn && (!this.props.links || this.props.links.length === 0)) {            
            await this.props.dispatch(fetchUserLinks());
        }
        if ( this.props.loggedIn && (!this.props.categories || this.props.categories.length === 0)) {            
            await this.props.dispatch(fetchUserCategories());
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
                <ToastContainer />
                <Toolbar /> 
                <SideDrawer /> 
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/register" component={RegistrationPage} />
                    <Route exact path="/my" component={DisplayLinks} />
                    <Route exact path="/links/new" component={LinkForm} />
                    <Route exact path="/links/edit/:linkId" component={LinkForm} />
                    <Route expact path="/categories/:categoryId/links" component={DisplayLinks} />
                    <Route exact path="/categories" component={Categories} />
                    <Route exact path="/categories/edit/:categoryId" component={EditCategory} />
                    <Route exact path="/categories/new" component={AddCategory} />                   
                    <Route component={NoMatch} />
                </Switch>                             
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null,
    links: state.userLinks.links,
    categories: state.categories.categories
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
