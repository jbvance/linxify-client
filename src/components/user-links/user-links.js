import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from '../requires-login';
import {fetchUserLinks} from '../../actions/links';
import LoadingSpinner from '../loading-spinner'

import './user-links.css';

export class UserLinks extends Component {

    deleteLink(id) {
        if (!window.confirm(`Are you sure you want to delete this link?`)) return;
        
    }

    renderLinks() {
        return this.props.userLinks.links.map(link => {
            const title = link.title || link.url;
            const favIcon = link.favIcon || '/images/default-icon.png';
            return (
                <div className="link-row" key={link._id}>
                    <div className="favicon"><img src={favIcon} alt={title}/></div>
                    <div className="url-text"><a href={link.url}>{title}</a></div>
                    <div className="link-row__button-row">
                        <Link to={{ pathname: `/links/edit/${link._id}` }} className="btn btn-primary link-row__button">Edit</Link>
                        <button className="btn btn-primary link-row__button" onClick={() => this.deleteLink(link._id)}>Delete</button>
                    </div>
                </div>
            )
        });       
    }

    render() {
        if (this.props.loading) {
            return <LoadingSpinner />
        } else if (this.props.error) {
            return <div>ERROR OCCURRED: {this.props.error.message}</div>
        }
        return (           
            <div>
                <h1>My Links</h1>
                <section className="container links-container">            
                    {this.renderLinks()}
                </section>
            </div>
        );
    }
}
    
const mapStateToProps = (state, props) => ({
    userLinks: state.userLinks,
    loading: state.userLinks.loading,
    error: state.userLinks.error
});

export default requiresLogin()(connect(mapStateToProps)(UserLinks));