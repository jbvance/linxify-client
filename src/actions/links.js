import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';


export const FETCH_LINKS_REQUEST = 'link_request';
export const FETCH_LINKS_SUCCESS = 'link_success';
export const FETCH_LINKS_ERROR = 'link_errror';


export const fetchUserLinks = () => (dispatch, getState) => {
    dispatch(linksRequest());
    const authToken = getState().auth.authToken;
    console.log(`${API_BASE_URL}/links`);
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

export const linksRequest = () => ({
    type: FETCH_LINKS_REQUEST
});
