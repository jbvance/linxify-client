import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import requiresLogin from '../requires-login';
import { addLink } from '../../actions/links';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import LinkForm from '../link-form/link-form';
  
export const AddLink = props => {           

    const submitLink = (url, category, title, note) => {        
        console.log(url, category, title, note);
        props.dispatch(addLink({            
            url,
            category,
            title,
            note
        })).then(() => {                
                if (!props.error) {                
                    toast.success('Link saved successfully!', {
                        position: toast.POSITION.TOP_CENTER
                    });
                props.history.push('/my');
            }
                     
        });               
    }        

        if (props.linksLoading || props.links.length === 0){ 
            console.log('loading');          
            return <LoadingSpinner />
        }
       
        return (       
            <div className="container">
                <h3 className="link-header">Add Link</h3>
                {props.error &&
                    <div className="container alert-alert-danger">{props.error.message}</div>
                }
                <LinkForm onSubmitLink={submitLink} />
            </div>
        ); 
};

const mapStateToProps = state => ({                          
    links: state.userLinks.links,
    linksLoading: state.userLinks.loading,      
    error: state.userLinks.error,    
});

export default requiresLogin()(connect(mapStateToProps)(AddLink));