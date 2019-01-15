import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import requiresLogin from '../requires-login';
import CategoryForm from './category-form';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import { editCategory } from '../../actions/categories';



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
        const name = this.getCategoryName(this.props.match.params.categoryId);
        this.setState({
            name
        })

        console.log('name', name);
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