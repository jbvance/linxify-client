import React from 'react';
import './search-bar.css';


const SearchBar = (props) => {
    return (
        <section className="container search-container">
            <div className="search-bar">
                <input type="text" 
                    className="browser-default search-textbox" 
                    placeholder="Search" 
                    onChange={(event) => props.onChange(event.target.value)}/>
            </div>
        </section>
    );
};

export default SearchBar;