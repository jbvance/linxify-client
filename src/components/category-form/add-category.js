import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import requiresLogin from '../requires-login';
import CategoryForm from './category-form';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import { addCategory } from '../../actions/categories';



export class AddCategory extends Component {
    constructor(props) {
        super(props);        
        this.submitAdd = this.submitAdd.bind(this);
        this.changeName = this.changeName.bind(this);

        this.state = {
            name: ''
        }
    }
    
    changeName(name) {
        this.setState({ name });        
    }
   
    async submitAdd(){  
                
        const name = this.state.name;

        await this.props.dispatch(addCategory(name));

        if (!this.props.categories.error) {
            toast.success("Category saved successfully!", {
                position: toast.POSITION.BOTTOM_CENTER
              });
        } else {
            console.error('ERROR SAVING CATEGORY', this.props.categories.error);
            toast.error("Unable to save category", {
                position: toast.POSITION.BOTTOM_CENTER
              });        
        }                            
    }   

    render() {

        if(this.props.categories.loading) {
            console.log('loading');
            return <LoadingSpinner />
        }                

        const { error } = this.props.categories;

        if (error) {
            return (
                <div className="alert alert-danger">
                    <p>{error.message}</p>
                </div>
            )
        }
    
        return (
            <CategoryForm onChangeName={this.changeName} onSubmitForm={this.submitAdd}
            />
        );

    }

   
};

const mapStateToProps = state => ({
    categories: state.categories
});

export default requiresLogin()(connect(mapStateToProps)(AddCategory));