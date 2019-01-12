import React from 'react';
import { connect } from 'react-redux';
import LoadingSpinner from '../loading-spinner';

export const LinkForm = (props) => {
    let title = props.title || null;
    let url = props.url || null;
    let note = props.note || null;

    //validates a given url
    const validUrl = (url) => {         
        const urlRegEx = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+){0,}\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g
        const result = url.match(urlRegEx);
        return !result || result.length < 1 ? false : true;
    }

    const getCategories =  () => {
        const array = [50, 100, 30]
        return array.map((item, index)=> <option key={index} value={item}>{item}</option>);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        //exit with error if url field is not a valid url
        if (!validUrl(url.value)) {

        }

        props.saveLink(title, url, note);                
    }

    if (props.loading) {
        return (
            <LoadingSpinner />
        )
    }

    return (     
      <div className="row container">

        {props.error &&
            <div className="col s12">
                <h2>{props.error}</h2>
            </div>
        
        }
        <form className="col s12" onSubmit={onSubmit}>
            <div className="row">
                <div className="input-field col s12 ">
                    <input id="title" type="text" required className="validate" defaultValue={title} ref={input => {title = input }} />
                    <label htmlFor="title">Title</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input id="url" type="text" required className="validate" defaultValue={url} ref={input => { url = input }} />
                    <label htmlFor="url">Url</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <textarea id="note" className="materialize-textarea" ref={input => note = input}></textarea>
                    <label htmlFor="note">Note</label>                
                </div>
            </div>            
            <div className="row">
                <div className="col s12">
                    <label htmlFor="category">Category</label>
                    <select id="category" className="browser-default">
                       {getCategories()}
                    </select>
                    
                </div>
            </div>
            
            <div className="row">
                <button type="submit" className="waves-effect waves-light btn">Submit</button>
            </div>
        </form>
        
      </div>
    );
};

const mapStateToProps = state => ({
    link: state.userLinks.linkToEdit,
    error: state.userLinks.error
});

export default connect(mapStateToProps)(LinkForm);