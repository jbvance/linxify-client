import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import requiresLogin from '../requires-login';
import CategoryForm from './category-form';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import { addCategory, editCategoryError } from '../../actions/categories';

export class AddCategory extends Component {
    constructor(props) {
        super(props);        
        this.submitAdd = this.submitAdd.bind(this);
        this.changeName = this.changeName.bind(this);

        this.state = {
            name: ''
        }
    }

    componentDidMount() {
        // clear out any error from a previous page's error(s) regarding categories
       this.props.dispatch(editCategoryError(null));
    }
    
    changeName(name) {
        this.setState({ name });        
    }
   
    submitAdd(){          
        const name = this.state.name;        
        this.props.dispatch(addCategory(name))
            .then(() => {                  
                if (!this.props.categories.error) {                    
                    toast.success("Category saved successfully!", {
                        position: toast.POSITION.TOP_CENTER
                    });
                    this.props.history.push('/categories');
                }       
            });
                                                                 
    }   

    render() {      

        if(this.props.categories.loading) {           
            return <LoadingSpinner />
        }                

        const { error } = this.props.categories;       
        return (
            <div className="container">            
                { error && error.error && (
                    <div className="alert alert-danger">
                        <p>Error: {error.error.message}</p>
                    </div> )
                }
                <CategoryForm onChangeName={this.changeName} onSubmitForm={this.submitAdd} />
            </div>           
        );
    }   
};

const mapStateToProps = state => ({
    categories: state.categories
});

export default requiresLogin()(connect(mapStateToProps)(AddCategory));