import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingSpinner from '../loading-spinner';
//import { fetchLinksRequest, fetchLinksSuccess } from '../../actions/links';
import { fetchUserCategories } from '../../actions/categories';

import {API_BASE_URL} from '../../config';

export class LinkForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            title: '',
            note: '',
            category: '',
            status: '',
            error: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.saveLink = this.saveLink.bind(this);
    }
   
    componentDidMount() {      
        this.setState({ error: null });
        try {            
            this.props.dispatch(fetchUserCategories());
        }
        catch(error) {
            console.error('ERROR: ' + error);
            this.setState({error: 'Unable to load the categories'})
        }        
    }

    saveLink () {
        const { title, url, note, category } = this.state;            
        if (this.props.match.params.linkId) {
            console.log('UPDATING LINK');
        } else {
            console.log('ADDING NEW LINK');
        }
    };

    handleChange (evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    //validates a given url
    validUrl(url) {         
        const urlRegEx = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+){0,}\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g
        const result = url.match(urlRegEx);
        return !result || result.length < 1 ? false : true;
    }

    renderCategories() {
        const categories = this.props.categories.map(category => {
            return <option key={category._id} value={category._id}>{category.name}</option>
        })
   
        return (
        <select id="category" className="browser-default">
            {categories}
        </select>
        );
    }
    onSubmit(event) {
        event.preventDefault();
        this.setState({error: ''});
        const { title, url, note, category } = this.state;        

        //exit with error if url field is not a valid url
        if (!this.validUrl(url)) {
            return this.setState({error: 'The Url field has an invalid format'});
        }

        this.saveLink();                
    }

    render() {       

        return (     
        <div className="container">

            {this.state.error &&
                <div className="col s12 alert alert-danger">
                    <p>Error: {this.state.error}</p>
                </div>
            
            }
            <form className="col s12" onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="input-field col s12 ">
                        <input id="title" name="title" type="text" 
                            onChange={this.handleChange} 
                            value={this.state.title} 
                            required 
                            className="validate" 
                        />
                        <label htmlFor="title">Title</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="url" name="url" type="text" 
                            onChange={this.handleChange} 
                            value={this.state.url} 
                            required 
                            className="validate"  
                        />
                        <label htmlFor="url">Url</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <textarea id="note" name="note"
                            onChange={this.handleChange} 
                            value={this.state.note} 
                            className="materialize-textarea">
                        </textarea>
                        <label htmlFor="note">Note</label>                
                    </div>
                </div>
                {this.props.categoriesLoading 
                    
                ? <div>Loading Categories...</div>
                :            
                <div className="row">
                    <div className="col s12">
                        <label htmlFor="category">Category</label>
                        {this.renderCategories()}
                        
                    </div>
                </div>
                }
                
                <div className="row">
                    <button type="submit" className="waves-effect waves-light btn">Submit</button>
                </div>
            </form>
            
        </div>
        );
    };
}

const mapStateToProps = state => ({
    link: state.userLinks.linkToEdit,        
    authToken: state.auth.authToken,
    categories: state.categories.categories,
    categoriesLoading: state.categories.loading
});

export default connect(mapStateToProps)(LinkForm);