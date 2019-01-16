import React, { Component } from 'react';
import {connect} from 'react-redux'
import requiresLogin from '../requires-login';
import LinkRow from '../link-row/link-row';
import SearchBar from '../search-bar/search-bar';
import { deleteLink, fetchUserLinks, addLinkFromAddressBar, clearLinkError } from '../../actions/links';
import LoadingSpinner from '../loading-spinner/loading-spinner'

import './user-links.css';

export class UserLinks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchFilter: ''
        }

        this.deleteLink = this.deleteLink.bind(this);    
        this.updateSearch = this.updateSearch.bind(this);    
        this.checkSearch = this.checkSearch.bind(this);    
    }

   componentDidMount() {   
        
        this.props.dispatch(clearLinkError());
        
        // first, save a new link if we got here after linkToSave has been set in state 
        const { linkToSave } = this.props;
        if (linkToSave && linkToSave.url) {           
            this.props.dispatch(addLinkFromAddressBar({url: linkToSave.url, category: linkToSave.category }));
        }

        if (this.props.error) return;

        this.setState({ links: this.props.userLinks.links});
    }

    deleteLink(id) {
        if (!window.confirm(`Are you sure you want to delete this link?`)) return;       
        this.props.dispatch(deleteLink(id))
            .then(() => console.log('DONE'));      
    }    

    renderLinks() {        
        return this.props.userLinks.links.map(link => <LinkRow key={link._id} link={link} deleteLink={this.deleteLink} />);    
    }

    updateSearch(value) {       
        this.setState({ searchFilter: value }); 
    }

    checkSearch(link) {
        return link.title.toLowerCase().indexOf(this.state.searchFilter.toLowerCase()) !== -1 ||
               link.url.toLowerCase().indexOf(this.state.searchFilter.toLowerCase()) !== -1 ||
               (link.note && link.note.toLowerCase().indexOf(this.state.searchFilter.toLowerCase()) !== -1);
    }

    render() { 
        let filteredLinks = this.props.userLinks.links.filter(this.checkSearch);

        if (this.props.loading) {
            return <LoadingSpinner />
        } else if (this.props.error) {
           <div className="alert alert-danger">Error: {this.props.error.error.message}</div>
        }
        return (                  
            <div> 
                <SearchBar onChange={this.updateSearch}/>
                <section className="container links-container">            
                    {filteredLinks.map(link => <LinkRow key={link._id} link={link} deleteLink={this.deleteLink} />)}
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