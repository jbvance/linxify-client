import React from 'react';
import LinkForm from './link-form';

const saveLink = (title, url, note) => {
    console.log('TITLE', title.value);
};

const AddLink = () => {
    return (
        <LinkForm saveLink={saveLink} />
    );
};

export default AddLink;