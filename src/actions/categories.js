'use strict';
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_CATEGORIES_REQUEST = 'categories_request';
export const FETCH_CATEGORIES_SUCCESS = 'categories_success';
export const FETCH_CATEGORIES_ERROR = 'categories_errror';
export const EDIT_CATEGORY_REQUEST = 'edit_category_request';
export const EDIT_CATEGORY_ERROR = 'edit_category_error';
export const EDIT_CATEGORY_SUCCESS = 'edit_category_success';

export const fetchUserCategories = () => (dispatch, getState) => {       
        dispatch(fetchCategoriesRequest()); 
        const token = getState().auth.authToken;
        return fetch(`${API_BASE_URL}/categories`, {
            method: 'GET',
            headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }),
        })
        .then(res => res.json())
        .then(resJson => {               
            const sortedCategories = resJson.data.sort((a, b) => a.name < b.name ? -1 : (a.name > b.name) ? 1 : 0); 
            console.log('CATEGORIES DATA', sortedCategories);             
           dispatch(fetchCategoriesSuccess({ data: sortedCategories }));
        })
        .catch(error => {
            console.error(error);
            dispatch(fetchCategoriesError({ error }))
        });
}

export const fetchCategoriesSuccess = data => ({
    type: FETCH_CATEGORIES_SUCCESS,
    data
});

export const fetchCategoriesError = error => ({
    type: FETCH_CATEGORIES_ERROR,
    error
});

export const fetchCategoriesRequest = () => {
    return {
        type: FETCH_CATEGORIES_REQUEST
    }
};

export const editCategorySuccess = data => ({
    type: EDIT_CATEGORY_SUCCESS,
    data: true
});

export const editCategoryError = error => ({
    type: EDIT_CATEGORY_ERROR,
    error
});

export const editCategoryRequest = () => ({
    type: EDIT_CATEGORY_REQUEST
});