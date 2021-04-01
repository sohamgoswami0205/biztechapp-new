import { apiAction } from './api';
import { GET_USER_DATA, SET_USER_DATA, SET_SEARCH_ERROR, GET_USER_REPOS, SET_USER_REPOS } from './types';

export function fetchUserData(searchInput) {
    return apiAction({
        url: `https://api.github.com/users/${searchInput}`,
        onSuccess: (data) => {
            if (data.message) {
                return setError(data.message);
            }
            else {
                return setData(data, searchInput);
            }

        },
        onFailure: (error) => {
            return setError(error);
        },
        label: GET_USER_DATA
    })
}

function setData(data, searchInput) {
    return {
        type: SET_USER_DATA,
        payload: data,
        input: searchInput
    }
}

export function fetchUserRepos(searchInput) {
    return apiAction({
        url: `https://api.github.com/users/${searchInput}/repos`,
        onSuccess: (data) => setRepos(data),
        onFailure: (error) => setError(error),
        label: GET_USER_REPOS
    })
}

function setRepos(data) {
    return {
        type: SET_USER_REPOS,
        payload: data
    }
}

function setError(error) {
    return {
        type: SET_SEARCH_ERROR,
        payload: error
    }
}