import React from 'react';

const Toolbar = () => (
    <nav>
        <div class="nav-wrapper">
        <a href="#" class="brand-logo">Logo</a>
        <a href="#" className="sidenav-trigger" data-target="mobile-nav">
            <i className="material-icons">menu</i>
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="#">Your Links</a></li>
            <li><a href="#">Add Link</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Add Category</a></li>
        </ul>
        </div>
  </nav>

 
);

export default Toolbar;