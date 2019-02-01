import React from 'react';
import { connect } from 'react-redux';

export const LinkForm = props => {
    
    let formTitle = null;
    let formUrl = null;
    let formNote = null;
    let formCategory = null;

    const renderCategoriesSelect = () => {                   
        let noneCategory = props.categories.find(category => category.name.toLowerCase() === 'none');
        if (noneCategory) {
            noneCategory = noneCategory._id;
        }       

        const defaultCategory = props.link && props.link.category ? props.link.category._id || props.link.category : noneCategory;      
        const categories = props.categories.map(category => {            
            return <option key={category._id} value={category._id || category}>{category.name}</option>
        })

        return (
        <select id="category" 
                name="category" 
                defaultValue={defaultCategory} 
                className="browser-default" 
                ref={(input) => { formCategory = input; }}>
            {categories}
        </select>
        );
    }
    
    const onSubmit = (event) => {
        event.preventDefault();       
        props.onSubmitLink(formUrl.value, formCategory.value, formTitle.value, formNote.value);
    }

    const { title, url, note } = props.link ? props.link : '';
        return (     
            <div className="container">                                           
                <form className="col s12 link-form card" onSubmit={onSubmit}>
                    <div className="row">
                        <div className="input-field col s12 ">
                            <input id="title" name="title" type="text"                             
                                defaultValue={title}
                                ref={(input) => { formTitle = input; }}
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
                                defaultValue={url} 
                                ref={(input) => { formUrl = input; }}
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
                                defaultValue={note} 
                                ref={(input) => { formNote = input; }}
                                className="materialize-textarea">
                            </textarea>
                            <label htmlFor="note" className="active">Note</label>                
                        </div>
                    </div>                   
                    <div className="row">
                        <div className="col s12">
                            <label htmlFor="category">Category</label>
                            {renderCategoriesSelect()}                      
                        </div>
                    </div>
                    <div className="row">
                        <button type="submit" className="btn btn-submit">Submit</button>
                    </div>                
                </form>
            </div>            
        );
};

const mapStateToProps = state => ({
    categories: state.categories.categories
});

export default connect(mapStateToProps)(LinkForm);