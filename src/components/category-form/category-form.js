import React from 'react';

const CategoryForm = (props) => {

    const onSubmit = (event) => {
        event.preventDefault();
        props.onSubmitForm();
    }
   
    const changeName = (event) => {
        props.onChangeName(event.target.value);
    }
                                    
        return (
            <div className="container">
                <h2>{props.header}</h2>
                <form className="col s12 link-form" onSubmit={onSubmit}>
                    <div className="row">
                        <div className="input-field col s12 ">
                            <input id="name" name="name" type="text"                            
                                value={props.name} onChange={changeName}                             
                                required 
                                pattern=".*\S+.*" 
                                title="This field cannot be blank"
                                className="validate"
                            />
                            <label htmlFor="name" className="active">Category Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <button type="submit" className="btn btn-submit">Submit</button>
                    </div>
                </form>
            </div>
        );

    }


export default CategoryForm;