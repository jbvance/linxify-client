import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import requiresLogin from '../requires-login';
import CategoryForm from './category-form';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import { editCategory, editCategoryError, fetchUserCategories } from '../../actions/categories';

export class EditCategory extends Component {
    constructor(props) {
        super(props);
        this.getCategoryName = this.getCategoryName.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
        this.changeName = this.changeName.bind(this);

        this.state = {
            name: ''
        }
    }

    componentDidMount() {          
         // clear out any error from a previous page's error(s) regarding categories
         this.props.dispatch(editCategoryError(null)); 

         const { categories }  = this.props.categories;
        if (!categories || categories.length === 0) {
            console.log('loading categories');
            this.props.dispatch(fetchUserCategories())
            .then(() => {
                this.setState({ name: this.getCategoryName(this.props.match.params.categoryId)})
            });
        } else {
            this.setState({ name: this.getCategoryName(this.props.match.params.categoryId)})
        }                    
    }

    changeName(name) {
        this.setState({ name });       
    }

    getCategoryName(id) {             
        const category = this.props.categories.categories.find(category => category._id === id);
        return category ? category.name : '';
    }

    async submitEdit(){  
        
        const id = this.props.match.params.categoryId;
        const name = this.state.name;      
        await this.props.dispatch(editCategory(id, name));

        if (!this.props.categories.error) {
            toast.success("Category saved successfully!", {
                position: toast.POSITION.TOP_CENTER
              });
        } else {
            console.error('ERROR SAVING CATEGORY', this.props.categories.error);
            toast.error("Unable to save category", {
                position: toast.POSITION.TOP_CENTER
              });        
        }                            
    }   

    render() {
       
        if(this.props.categories.loading) {           
            return <LoadingSpinner />
        }   
                
        const { error } = this.props.categories;

        if (error) {
            return (
                <div className="alert alert-danger">
                    <p>{error.error.message}</p>
                </div>
            )
        }
    
        return (
            <CategoryForm name={this.state.name}                          
                          onChangeName={this.changeName}
                          onSubmitForm={this.submitEdit}
            />
        );

    }

   
};

const mapStateToProps = state => ({
    categories: state.categories
});

export default requiresLogin()(connect(mapStateToProps)(EditCategory));