import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import requiresLogin from '../requires-login';
import { addLink, fetchUserLinks } from '../../actions/links';
import { fetchUserCategories } from '../../actions/categories';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import LinkForm from '../link-form/link-form';
  
export class AddLink extends Component {    
    
    componentDidMount() {
        this.props.dispatch(fetchUserCategories());
    }

    submitLink (url, category, title, note) {              
        this.props.dispatch(addLink({            
            url,
            category,
            title,
            note
        })).then(() => {                
                if (!this.props.error) {                
                    toast.success('Link saved successfully!', {
                        position: toast.POSITION.TOP_CENTER
                    });
                this.props.history.push('/my');
            }                     
        });               
    }  
    
    render() {
        if (this.props.linksLoading || this.props.categoriesLoading){                   
            return <LoadingSpinner />
        }
       
        return (       
            <div className="container">
                <h3 className="link-header">Add Link</h3>
                {this.props.error &&
                    <div className="container alert-alert-danger">{this.props.error.message}</div>
                }
                <LinkForm onSubmitLink={(url, category, title, note) => this.submitLink(url, category, title, note)} />
            </div>
        ); 
    }

       
};

const mapStateToProps = state => ({                             
    linksLoading: state.userLinks.loading,      
    error: state.userLinks.error,   
    categoriesLoading: state.categories.loading 
});

export default requiresLogin()(connect(mapStateToProps)(AddLink));