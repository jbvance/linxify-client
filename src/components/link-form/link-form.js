import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import requiresLogin from '../requires-login';
//import { fetchLinksRequest, fetchLinksSuccess } from '../../actions/links';
import { fetchUserCategories } from '../../actions/categories';
import { fetchUserLinks, editLinkRequest, editLinkSuccess, editLinkError, editLink, addLink, addLinkSuccess, clearLinkError  } from '../../actions/links';

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

        this.props.dispatch(clearLinkError());        
        if (this.props.match.params.linkId) {
            const linkIndex = this.props.links.findIndex(link => link._id === this.props.match.params.linkId);
            if (linkIndex < 0) {                   
                this.setState({ error: `Unable to find link with id '${this.props.match.params.linkId}'`});
            } else {                    
                const link = this.props.links[linkIndex]
                const { url, title, note } =  link;
                const category =  link.category._id || link.category; 
                this.setState({
                    url,
                    title,
                    note,
                    category
                })                     
            }                
        }  
        return this.props.dispatch(fetchUserCategories());                
    }
   
    saveLink () {
        this.setState({ error: '' })
        const { title, url, note, category } = this.state; 
        const { linkId } = this.props.match.params;
        if (linkId) {            
            this.props.dispatch(editLink({ id: linkId, url, category, title, note }))
                .then(() => {
                    toast.success("Link saved successfully!", {
                        position: toast.POSITION.TOP_CENTER
                    }); 
                    this.props.history.push('/my');
                })
                .catch(error => {
                    toast.error(error.message, {
                        position: toast.POSITION.TOP_CENTER
                    }); 
                    console.error('ERROR SAVING LINK: ' + error);
                })
            
        } else {           
            this.props.dispatch(addLink({ title, url, note, category }))
                .then(() => {
                    toast.success("Link saved successfully!", {
                        position: toast.POSITION.TOP_CENTER
                    });
                    this.props.history.push('/my');
                })
                .catch(error => {
                    console.log('ERROR SAVING LINK: ' + error);
                })
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

        let noneCategory = this.props.categories.find(category => category.name === 'none');
        if (noneCategory) {
            noneCategory = noneCategory._id;
        }
        console.log('noneCategory', noneCategory);

        const categories = this.props.categories.map(category => { 
            if (category._id === noneCategory) console.log('FOUND NONE');
            return <option key={category._id} value={category._id}>{category.name}</option>
        })
   
        return (
        <select id="category" name="category" value={this.state.category || noneCategory} onChange={this.handleChange} className="browser-default">
            {categories}
        </select>
        );
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({error: ''});
        const { url } = this.state;        

        //exit with error if url field is not a valid url
        if (!this.validUrl(url)) {
            return this.setState({error: 'The Url field has an invalid format'});
        }

        this.saveLink();                
    }

    render() {        

        const { addEditLinkError } = this.props;
        if (this.props.linksLoading) {
            return <LoadingSpinner />
        }  
                
        return (     
        <div className="container">            
            {this.state.error &&
                <div className="col s12 alert alert-danger">
                    <p>Error: {this.state.error}</p>
                </div>
            
            }
            {addEditLinkError &&
                <div className="col s12 alert alert-danger">
                    <p>Error: {addEditLinkError.message}</p>
                </div>
            }
            <form className="col s12 link-form" onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="input-field col s12 ">
                        <input id="title" name="title" type="text" 
                            onChange={this.handleChange} 
                            value={this.state.title} 
                            required
                            pattern=".*\S+.*" 
                            title="Title cannot be blank"
                            className="validate" 
                        />
                        <label htmlFor="title" className="active">Title</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="url" name="url" type="url" 
                            onChange={this.handleChange} 
                            value={this.state.url} 
                            required
                            pattern=".*\S+.*" 
                            title="url cannot be blank" 
                            className="validate"  
                        />
                        <label htmlFor="url" className="active">Url</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <textarea id="note" name="note"
                            onChange={this.handleChange} 
                            value={this.state.note || ''} 
                            className="materialize-textarea">
                        </textarea>
                        <label htmlFor="note" className="active">Note</label>                
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
                    <button type="submit" className="btn btn-submit">Submit</button>
                </div>
            </form>
            
        </div>
        );
    };
}

const mapStateToProps = state => ({                
    categories: state.categories.categories,   
    categoriesLoading: state.categories.loading,
    links: state.userLinks.links,
    linksLoading: state.userLinks.loading,
    addEditLinkError: state.userLinks.error
});

export default requiresLogin()(connect(mapStateToProps)(LinkForm));