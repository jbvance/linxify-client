import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import requiresLogin from '../requires-login';
import { editLink, fetchUserLinks } from '../../actions/links';
import { fetchUserCategories } from '../../actions/categories';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import LinkForm from '../link-form/link-form';
  export class EditLink extends Component {

    componentDidMount() {
        this.props.dispatch(fetchUserLinks());
        this.props.dispatch(fetchUserCategories());
    }
    
    getLink (id) {        
        if (!this.props.links) return;
        const link = this.props.links.find(lnk => lnk._id === id);         
        return link;
    }   

    submitLink (url, category, title, note) {
        this.props.dispatch(editLink({
            id: this.props.match.params.linkId,
            url,
            category,
            title,
            note
        })).then(() => {
            if (!this.props.error) {
                toast.success('Link saved successfully!', {
                    position: toast.POSITION.TOP_CENTER
                });
                this.props.history.goBack();
            }
        });
    }

    render() {
        const linkId = this.props.match.params.linkId;
        
        if (this.props.linksLoading || this.props.categoriesLoading){                      
            return <LoadingSpinner />
        }

        const link = this.getLink(linkId);
        if (!link) {
            return <div className=" container alert alert-danger">Unble to locate link</div>
        }

        return (       
            <div className="container">
                <h3 className="link-header">Edit Link</h3>
                {this.props.error &&
                    <div className="container alert-alert-danger">{this.props.error.message}</div>
                }
                <LinkForm link={link} onSubmitLink={(url, category, title, note) => this.submitLink(url, category, title, note)} />
            </div>
        ); 
    }

};

const mapStateToProps = state => ({                          
    links: state.userLinks.links,
    linksLoading: state.userLinks.loading,      
    error: state.userLinks.error,    
    categories: state.categories.categories,
    categoriesLoading: state.categories.loading
});

export default requiresLogin()(connect(mapStateToProps)(EditLink));