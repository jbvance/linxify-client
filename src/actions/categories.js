import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_CATEGORIES_REQUEST = 'categories_request';
export const FETCH_CATEGORIES_SUCCESS = 'categories_success';
export const FETCH_CATEGORIES_ERROR = 'categories_errror';
export const EDIT_CATEGORY_REQUEST = 'edit_category_request';
export const EDIT_CATEGORY_ERROR = 'edit_category_error';
export const EDIT_CATEGORY_SUCCESS = 'edit_category_success';
export const ADD_CATEGORY_SUCCESS = 'add_category_success';
export const DELETE_CATEGORY_SUCCESS = 'delete_category_success';

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
           dispatch(fetchCategoriesSuccess({ data: sortedCategories }));
        })
        .catch(error => {
            console.error(error);
            dispatch(fetchCategoriesError({ error }))
        });
}

export const editCategory = (id, name) => (dispatch, getState) => {
    const token = getState().auth.authToken;  
    console.log('in action', id, name);
    dispatch(editCategoryRequest());   
    fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'PUT',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }),
        body: JSON.stringify({
          name
        })
      })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(editCategorySuccess(data)))
        .catch(error => {
            console.error(error);
            dispatch(editCategoryError({ error }))
      })
};

export const addCategory = (name) =>  (dispatch, getState) => {
    const token = getState().auth.authToken;  
    dispatch(editCategoryRequest());   
    return fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }),
        body: JSON.stringify({
          name
        })
      })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(addCategorySuccess(data)))
        .catch(error => {
            console.error(error);
            dispatch(editCategoryError({ error }))
      })
};

export const deleteCategory = (id) => (dispatch, getState) => {
    dispatch(editCategoryRequest());
    const authToken = getState().auth.authToken;  
    fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }),
      })   
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(({data}) => dispatch(deleteCategorySuccess(id)))
      .catch(error => {
          console.error(error);
          dispatch(editCategoryError({ error }))
    })
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
    data
});

export const addCategorySuccess = data => ({
    type: ADD_CATEGORY_SUCCESS,
    data
})

export const editCategoryError = error => ({
    type: EDIT_CATEGORY_ERROR,
    error
});

export const editCategoryRequest = () => ({
    type: EDIT_CATEGORY_REQUEST
});

export const deleteCategorySuccess = id => ({
    type: DELETE_CATEGORY_SUCCESS,
    id
})