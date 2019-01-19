import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import { ADD_CATEGORY_SUCCESS, addCategorySuccess } from './categories';


export const FETCH_LINKS_REQUEST = 'fetch_link_request';
export const FETCH_LINKS_SUCCESS = 'fetch_link_success';
export const FETCH_LINKS_ERROR = 'link_errror';
export const EDIT_LINK_REQUEST = 'edit_link_request';
export const EDIT_LINK_ERROR = 'edit_link_error';
export const EDIT_LINK_SUCCESS = 'edit_link_success';
export const ADD_LINK_SUCCESS = 'add_link_success';
export const DELETE_LINK_SUCCESS = 'delete_link_success';
export const SET_LINK_TO_SAVE = 'set_link_to_save';
export const CLEAR_LINK_ERROR = 'clear_link_error';

export const fetchUserLinks = () => (dispatch, getState) => {
    dispatch(fetchLinksRequest());
    const authToken = getState().auth.authToken;    
    return fetch(`${API_BASE_URL}/links`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(fetchLinksSuccess(data)))
        .catch(err => {
            console.error(err);
            dispatch(fetchLinksError(err));
        });
};

export const fetchLinksSuccess = data => ({
    type: FETCH_LINKS_SUCCESS,
    data
});

export const fetchLinksError = error => ({
    type: FETCH_LINKS_ERROR,
    error
});

export const fetchLinksRequest = () => {    
    return {
        type: FETCH_LINKS_REQUEST
    }
};

export const editLinkSuccess = data => ({
    type: EDIT_LINK_SUCCESS,
    data
});

export const editLinkError = error => ({
    type: EDIT_LINK_ERROR,
    error
});

export const editLinkRequest = () => ({
    type: EDIT_LINK_REQUEST
});

export const setLinkToSave = (link) => {
    return {
        type: SET_LINK_TO_SAVE,
        link: { 
            url: link.url,
            category: link.category
        }
    }   
};

export const editLink = ({ id, url, category, title, note }) => (dispatch, getState) => {
    dispatch(editLinkRequest());
    const authToken = getState().auth.authToken;    
    return fetch(`${API_BASE_URL}/links/${id}`, {
        method: 'PUT',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }),
          body: JSON.stringify({
            url,
            category,
            title,
            note
          })
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(editLinkSuccess(data)))
        .catch(err => {
            console.error(err);
            dispatch(editLinkError(err));
        });
}

export const addLink = ({ url, category, title, note }) => async (dispatch, getState) => {
    dispatch(editLinkRequest());
    const authToken = getState().auth.authToken;        
    return fetch(`${API_BASE_URL}/links`, {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }),
          body: JSON.stringify({
            url,
            category,
            title,
            note
          })
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(addLinkSuccess(data)))
        .catch(err => {
            console.error(err);
            dispatch(editLinkError(err));
        });
}

export const addLinkFromAddressBar = ({ url, category = null, title = null, note = null }) => async (dispatch, getState) => {
    
    dispatch(editLinkRequest());    
    const authToken = getState().auth.authToken;    
    return fetch(`${API_BASE_URL}/links`, {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }),
          body: JSON.stringify({
            url,
            category,
            title,
            note
          })
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => {
            // add category to state if it user has sav= new
            // category as part of the url passed in            
            const categories = getState().categories.categories;            
            if (!categories.find(cat => cat._id === data.category._id)) {
               //category was added to database, dispatch action
               // to add new category to state
               dispatch(addCategorySuccess(data.category));
            }
            dispatch(addLinkSuccess(data));
            dispatch(setLinkToSave( {url: null, category: null} ));
        })
        .catch(err => {
            console.error(err);
            dispatch(editLinkError(err));
            // clear out link to save even if an error occurred so that the app
            // doesn't attempt to save a link every time the display links component is mounted
            dispatch(setLinkToSave({url: null, category: null}));
        });
}

export const deleteLink = (id) => async (dispatch, getState) => {
    dispatch(editLinkRequest());
    const authToken = getState().auth.authToken;  
    return fetch(`${API_BASE_URL}/links/${id}`, {
        method: 'DELETE',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }),
      })   
        .then(res => {
            if (res.status !== 204) {
                throw new Error ('Unable to delete link');
            }
            dispatch(deleteLinkSuccess(id));
        })
        .catch(err => {
            console.error(err);
            dispatch(editLinkError(err));
        });
}

export const addLinkSuccess = data => ({
    type: ADD_LINK_SUCCESS,
    data
})

export const deleteLinkSuccess = id => ({
    type: DELETE_LINK_SUCCESS,
    id
})

export const clearLinkError = () => ({
    type: CLEAR_LINK_ERROR
});


