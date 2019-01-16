import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import requiresLogin from '../requires-login';
import LoadingSpinner from '../loading-spinner/loading-spinner'
import { deleteCategory, editCategoryError } from '../../actions/categories';
import editCategory from '../category-form/edit-category';


const Categories = (props) => {
    
    //clear any errors before rendering
    props.dispatch(editCategoryError(null));

    const sortCategories = (a, b) => {
        const textA = a.name.toUpperCase();
        const textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }
    
    const deleteUserCategory =  (id, name) => {
        if (!window.confirm(`Delete category "${name}"?`)) return;  
        props.dispatch(deleteCategory(id));        
                                                                                                  
    }
    
    const renderCategories = (categories) => {
        const sortedCategories = categories.sort(sortCategories);
        return sortedCategories.map(category => {
            const title = category.name
            return (
                <div key={category._id} className="link-row"> 
                    <div className="url-text">
                        <Link to={{ pathname: `/categories/${category._id}/links` }}>{category.name}</Link>
                    </div>                      
                    <div className="link-row__button-row">
                        <Link to={{ pathname: `/categories/edit/${category._id}` }} className="btn btn-primary link-row__button">Edit</Link>
                        <button className="btn btn-primary link-row__button" onClick={() => deleteUserCategory(category._id, category.name)}>Delete</button>
                    </div>
                </div>
          )
        });
    };

    if (props.loading) {        
        return <LoadingSpinner />
    }

    if (props.error) {
        {
            toast.error(props.error.error.message, {
            position: toast.POSITION.TOP_CENTER
          });          
        }
    }
    
    return (
        <div className="container">
            <h2>Categories</h2>
            <div>
                {renderCategories(props.categories)}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    categories: state.categories.categories,
    loading: state.categories.loading,
    error: state.categories.error
});

export default requiresLogin()(connect(mapStateToProps)(Categories));