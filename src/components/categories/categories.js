import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import requiresLogin from '../requires-login';
import LoadingSpinner from '../loading-spinner/loading-spinner'
import { deleteCategory, fetchUserCategories } from '../../actions/categories';

class Categories extends Component {

    componentDidMount() {                
        this.props.dispatch(fetchUserCategories());      
    }       

    sortCategories (a, b) {
        const textA = a.name.toUpperCase();
        const textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }
    
    deleteUserCategory (id, name) {
        if (!window.confirm(`Delete category "${name}"?`)) return;  
        this.props.dispatch(deleteCategory(id));        
                                                                                                  
    }
    
    renderCategories (categories) {
        const sortedCategories = categories.sort(this.sortCategories);
        return sortedCategories.map(category => {
            const title = category.name
            return (
                <div key={category._id} className="link-row hoverable"> 
                    <div className="url-text">
                        <Link to={{ pathname: `/categories/${category._id}/links` }}>{category.name}</Link>
                    </div>                      
                    <div className="link-row__button-row">
                        <Link to={{ pathname: `/categories/edit/${category._id}` }} className="btn btn-primary link-row__button">Edit</Link>
                        <button className="btn btn-primary link-row__button" onClick={() => this.deleteUserCategory(category._id, category.name)}>Delete</button>
                    </div>
                </div>
          )
        });
    };

    render() {
        if (this.props.loading) {        
            return <LoadingSpinner />
        }
    
        if (this.props.error) {
            {
                toast.error(this.props.error.error.message, {
                position: toast.POSITION.TOP_CENTER
              });          
            }
        }
        
        return (
            <div className="container">
                <h2>Categories</h2>
                <div>
                    {this.props.categories.length > 0 ? this.renderCategories(this.props.categories) : <p>No categories found</p>}
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    categories: state.categories.categories,
    loading: state.categories.loading,
    error: state.categories.error
});

export default requiresLogin()(connect(mapStateToProps)(Categories));