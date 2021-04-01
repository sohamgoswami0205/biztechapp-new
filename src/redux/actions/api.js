import { API, API_START, API_END } from './types';

export function apiAction({
    url = '',
    method = 'GET',
    data = null,
    onSuccess = () => { },
    onFailure,
    label = '',
    headersOverride = null,
    actionData = null,
    timeout = 30000,
    responseType = 'json',
    simulateError = false
}) {
    return {
        type: API,
        payload: {
            url,
            method,
            data,
            onSuccess,
            onFailure,
            label,
            headersOverride,
            actionData,
            timeout,
            responseType,
            simulateError
        },
    };
}

export const apiStart = label => ({
    type: API_START,
    payload: label
});

export const apiEnd = label => ({
    type: API_END,
    payload: label
})