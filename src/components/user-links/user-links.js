import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'; 
import requiresLogin from '../requires-login';
import LinkRow from '../link-row/link-row';
import SearchBar from '../search-bar/search-bar';
import { deleteLink, fetchUserLinks, addLinkFromAddressBar, clearLinkError } from '../../actions/links';
import LoadingSpinner from '../loading-spinner/loading-spinner'

import './user-links.css';

export class UserLinks extends Component {

    async componentDidMount() {   
        
        this.props.dispatch(clearLinkError());
        
        // first, save a new link if we got here after linkToSave has been set in state 
        const { linkToSave } = this.props;
        if (linkToSave && linkToSave.url) {           
            await this.props.dispatch(addLinkFromAddressBar({url: linkToSave.url, category: linkToSave.category }));
        }

        if (this.props.error) return;

        //load links if they have not previously been loaded
        if ( this.props.loggedIn && (!this.props.links || this.props.links.length === 0)) {            
            await this.props.dispatch(fetchUserLinks());
        }
    }

    deleteLink(id) {
        if (!window.confirm(`Are you sure you want to delete this link?`)) return;       
        this.props.dispatch(deleteLink(id))       
    }    

    renderLinks() {
        console.log('rendering', this.props.userLinks.links.length);
        return this.props.userLinks.links.map(link => <LinkRow link={link} />);    
    }

    FilterLinks(value) {
        console.log('changed', value);
    }

    render() {
        if (this.props.loading) {
            return <LoadingSpinner />
        } else if (this.props.error) {
            return <div>ERROR OCCURRED: {this.props.error.message}</div>
        }
        return (                  
            <div> 
                <SearchBar onChange={this.FilterLinks}/>
                <section className="container links-container">            
                    {this.renderLinks()}
                </section>
            </div>
        );
    }
}
    
const mapStateToProps = (state, props) => ({
    userLinks: state.userLinks,
    linkToSave: state.userLinks.linkToSave,
    loggedIn: state.auth.currentUser !== null,
    loading: state.userLinks.loading,
    error: state.userLinks.error
});

export default requiresLogin()(connect(mapStateToProps)(UserLinks));