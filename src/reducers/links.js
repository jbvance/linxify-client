import {
    FETCH_LINKS_REQUEST,
    FETCH_LINKS_SUCCESS,
    FETCH_LINKS_ERROR,
    EDIT_LINK_REQUEST,
    EDIT_LINK_ERROR,
    EDIT_LINK_SUCCESS,
    ADD_LINK_SUCCESS,
    DELETE_LINK_SUCCESS
} from '../actions/links';

const initialState = {
    links: [],
    loading: false,
    error: null
};

export default function reducer(state = initialState, action) {    
    switch(action.type) {
        case FETCH_LINKS_REQUEST:            
            return Object.assign({}, state, { 
                loading: true,
                error: null 
            });
        case FETCH_LINKS_SUCCESS:                      
            return Object.assign({}, state, { 
                loading: false,
                links: action.data,
                error: null
            });
        case FETCH_LINKS_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: action.error
            });
        case EDIT_LINK_REQUEST:
            return Object.assign({}, state, { loading: true, error: null });
        case EDIT_LINK_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: action.error
            })
        case EDIT_LINK_SUCCESS:
            console.log('DATA', action.data);
            return Object.assign({}, state, {
                loading: false,
                error: null,
                links: state.links.map(link => {
                    return action.data._id !== link._id ? link :{...link, ...action.data};
                })
            });
        case ADD_LINK_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: null,
                links: [action.data, ...state.links]
            });
        case DELETE_LINK_SUCCESS:
            const index = state.links.findIndex(item => item._id === action.id);
            console.log('index to delete', index);
            return Object.assign({}, state, {
                loading: false,
                error: null,
                links: [...state.links.slice(0, index), ...state.links.slice(index + 1)]

            })
        
        default:
            return state;
    }        
}