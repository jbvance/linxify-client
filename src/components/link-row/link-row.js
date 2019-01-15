import React from 'react';
import { Link } from 'react-router-dom';
import './link-row.css';

const LinkRow = ({ link, deleteLink }) => {
    
    const title = link.title || link.url;
    const favIcon = link.favIcon || '/images/default-icon.png';
    return (
        <div className="link-row" key={link._id}>
            <div className="favicon"><img src={favIcon} alt={title}/></div>
            <div className="url-text"><a href={link.url}>{title}</a></div>
            <div className="link-row__button-row">
                <Link to={{ pathname: `/links/edit/${link._id}` }} className="btn btn-primary link-row__button">Edit</Link>
                <button className="btn btn-primary link-row__button" onClick={() => deleteLink(link._id)}>Delete</button>
            </div>
        </div>
    )
};

export default LinkRow;