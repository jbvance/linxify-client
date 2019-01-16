import React from 'react';
import LinkRow from '../link-row/link-row';

import './user-links.css';

const  UserLinks = props => { 
        return (                  
            <div>         
                <section className="container links-container">            
                    {props.links.map(link => <LinkRow key={link._id} link={link} deleteLink={props.deleteLink} />)}
                </section>
            </div>
        );
}
    

export default UserLinks;