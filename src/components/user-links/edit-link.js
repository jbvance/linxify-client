import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import requiresLogin from '../requires-login';
import { editLink } from '../../actions/links';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import LinkForm from '../link-form/link-form';
  
export const EditLink = props => {
    
    const linkId = props.match.params.linkId;

    const getLink = (id) => {
        if (!props.links) return;
        const link = props.links.find(lnk => lnk._id === id);         
        return link;
    }   

    const submitLink = (url, category, title, note) => {
        console.log('LINK_ID', linkId);
        console.log(url, category, title, note);
        props.dispatch(editLink({
            id: linkId,
            url,
            category,
            title,
            note
        })).then(() => {                
                if (!props.error) {                
                    toast.success('Link saved successfully!', {
                        position: toast.POSITION.TOP_CENTER
                    });
                props.history.goBack();
            }
                     
        });               
    }        

        if (props.linksLoading || props.links.length === 0){ 
            console.log('loading');          
            return <LoadingSpinner />
        }

        const link = getLink(linkId);
        if (!link) {
            return <div className=" container alert alert-danger">Unble to locate link</div>
        }

        return (       
            <div className="container">
                <h3 className="link-header">Edit Link</h3>
                {props.error &&
                    <div className="container alert-alert-danger">{props.error.message}</div>
                }
                <LinkForm link={link} onSubmitLink={submitLink} />
            </div>
        ); 
};

const mapStateToProps = state => ({                          
    links: state.userLinks.links,
    linksLoading: state.userLinks.loading,      
    error: state.userLinks.error,    
});

export default requiresLogin()(connect(mapStateToProps)(EditLink));