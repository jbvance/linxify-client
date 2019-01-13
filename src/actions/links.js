import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';


export const FETCH_LINKS_REQUEST = 'link_request';
export const FETCH_LINKS_SUCCESS = 'link_success';
export const FETCH_LINKS_ERROR = 'link_errror';
export const EDIT_LINK_REQUEST = 'edit_link_request';
export const EDIT_LINK_ERROR = 'edit_link_error';
export const EDIT_LINK_SUCCESS = 'edit_link_success';
export const ADD_LINK_SUCCESS = 'add_link_success';


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

export const addLink = ({ url, category, title, note }) => (dispatch, getState) => {
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

export const addLinkSuccess = data => ({
    type: ADD_LINK_SUCCESS,
    data
})
