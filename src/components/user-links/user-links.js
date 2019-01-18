import React from 'react';
import LinkRow from '../link-row/link-row';

import './user-links.css';

const  UserLinks = props => { 
        
        return (                  
            <section className="container links-container"> 
            {!props.links || props.links.length === 0 ? (
                <div>No links found</div>
              ) : (
                props.links.map(link => <LinkRow key={link._id} link={link} deleteLink={props.deleteLink} />)
              )}                         
            </section>
           
        );
}
    

export default UserLinks;