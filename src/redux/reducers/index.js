import {
    SET_USER_DATA,
    SET_SEARCH_ERROR,
    SET_USER_REPOS,
    GET_USER_DATA,
    GET_USER_REPOS
} from "../actions/types";

export const initialState = {
    searchInput: '',
    userData: {
        data: {},
        loading: false
    },
    error: null,
    repos: {
        data: [],
        loading: false
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    loading: true
                },
                error: null
            }
        case SET_USER_DATA:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    data: action.payload,
                    loading: false
                },
                searchInput: action.input
            }
        case GET_USER_REPOS:
            return {
                ...state,
                repos: {
                    ...state.repos,
                    loading: true
                },
                error: null
            }
        case SET_USER_REPOS:
            return {
                ...state,
                repos: {
                    ...state.repos,
                    data: action.payload,
                    loading: false
                }
            }
        case SET_SEARCH_ERROR:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    loading: false
                },
                repos: {
                    ...state.repos,
                    loading: false
                },
                error: action.payload
            }
        default:
            return { ...state }
    }
}