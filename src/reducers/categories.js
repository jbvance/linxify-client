import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_ERROR,
    EDIT_CATEGORY_REQUEST,
    EDIT_CATEGORY_ERROR,
    EDIT_CATEGORY_SUCCESS,
    ADD_CATEGORY_SUCCESS,
    DELETE_CATEGORY_SUCCESS
} from '../actions/categories';

const initialState = {
    categories: [],
    loading: false,
    error: null
};

export default function reducer(state = initialState, action) {    
    switch(action.type) {
        case FETCH_CATEGORIES_REQUEST:
            return Object.assign({}, state, { 
                loading: true,
                error: null 
            });
        case FETCH_CATEGORIES_SUCCESS:            
            return Object.assign({}, state, { 
                loading: false,
                categories: action.data.data,
                error: null
            });
        case FETCH_CATEGORIES_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: action.error
            });
        case EDIT_CATEGORY_REQUEST:
            return Object.assign({}, state, { 
                loading: true,
                error: null
            });
        case EDIT_CATEGORY_ERROR:
            console.log('ERROR IN REDUCER');
            return Object.assign({}, state, {
                loading: false,
                error: action.error
            })
        case EDIT_CATEGORY_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: null,
                categories: state.categories.map(category => {
                    return action.data._id !== category._id ? category :{...category, ...action.data};
                })
            });
        case ADD_CATEGORY_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: null,
                categories: [...state.categories, action.data]
            });
        case DELETE_CATEGORY_SUCCESS:
            const index = state.categories.findIndex(item => item._id === action.id);
            console.log('index to delete', index);
            return Object.assign({}, state, {
                loading: false,
                error: null,
                categories: [...state.categories.slice(0, index), ...state.categories.slice(index + 1)]

            })
        default:
            return state;
    }        
}