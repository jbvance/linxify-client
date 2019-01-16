import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLinks from './user-links';
import SearchBar from '../search-bar/search-bar';
import requiresLogin from '../requires-login';
import { addLinkFromAddressBar, fetchUserLinks, clearLinkError, deleteLink } from '../../actions/links';
import LoadingSpinner from '../loading-spinner/loading-spinner'

class DisplayLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchFilter: ''
        }
        this.updateSearch = this.updateSearch.bind(this);    
        this.checkSearch = this.checkSearch.bind(this); 
        this.deleteLink = this.deleteLink.bind(this);  
        this.filteredLinks = this.filteredLinks.bind(this);
        this.filterByCategory = this.filterByCategory.bind(this); 
    }

    componentDidMount() {       
        this.props.dispatch(clearLinkError());
        
        // save a new link if we got here after linkToSave has been set in state 
        const { linkToSave } = this.props;
        if (linkToSave && linkToSave.url) {           
            this.props.dispatch(addLinkFromAddressBar({url: linkToSave.url, category: linkToSave.category }))
            .then(() => {
                this.props.dispatch(fetchUserLinks());
            });
        } 
    }

    updateSearch(value) {             
        this.setState({ searchFilter: value }); 
    }

    checkSearch(link) {        
        return link.title.toLowerCase().indexOf(this.state.searchFilter.toLowerCase()) !== -1 ||
               link.url.toLowerCase().indexOf(this.state.searchFilter.toLowerCase()) !== -1 ||
               (link.note && link.note.toLowerCase().indexOf(this.state.searchFilter.toLowerCase()) !== -1);
    }

    filterByCategory(links, categoryId) {        
        if (!categoryId) return links;       
        return links.filter(link => {
            //after a link gets edited, the catgory object on state is changed to only include
            // the category id, so check which one is presnet
            const linkCategoryId = link.category._id || link.category;
            return categoryId === linkCategoryId
        })
    }

    filteredLinks(links, categoryId) {
        return categoryId ? this.filterByCategory(links, categoryId).filter(this.checkSearch) : links.filter(this.checkSearch);
    }

    deleteLink(id) {
        if (!window.confirm(`Are you sure you want to delete this link?`)) return;       
        this.props.dispatch(deleteLink(id))
            .then(() => console.log('DONE'));      
    } 

    render() { 
    
        const categoryId = this.props.match.params.categoryId;

        if (this.props.loading) {
            return <LoadingSpinner />
        } else if (this.props.error) {
           <div className="alert alert-danger">Error: {this.props.error.error.message}</div>
        }                                  
        let filteredLinks = this.filteredLinks(this.props.userLinks, categoryId);     
        return (
            <div>
                <SearchBar onChange={this.updateSearch}/>
                <UserLinks links = {filteredLinks} checkSearch={this.checkSearch} deleteLink={this.deleteLink}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userLinks: state.userLinks.links,
    linkToSave: state.userLinks.linkToSave,    
    loading: state.userLinks.loading,
    error: state.userLinks.error
});

export default requiresLogin()(connect(mapStateToProps)(DisplayLinks));
