import React, { Component } from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchUserLinks} from '../actions/links';

import './user-links.css';

export class UserLinks extends Component {

    componentDidMount() {
        this.props.dispatch(fetchUserLinks());
    }

    renderLinks() {

        return this.props.userLinks.links.map(link => {
            const title = link.title || link.url;
            const favIcon = link.favIcon || '/images/default-icon.png';
            return (
                <div className="link-row" key={link._id}>
                    <div className="favicon"><img src={favIcon} /></div>
                    <div className="url-text"><a href={link.url}>{title}</a></div>
                    <div className="link-row__button-row">
                        <button className="btn btn-primary link-row__button">Edit</button>
                        <button className="btn btn-primary link-row__button">Delete</button>
                    </div>
                </div>
            )
        });       
    }

    render() {
        return (
            <div>
                <h1>My Links</h1>
                <section className="links-container">
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