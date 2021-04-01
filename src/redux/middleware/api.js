import axios from '../../utils/axios';

import { API } from '../actions/types';
import { apiStart, apiEnd } from '../actions/api';

const apiMiddleware = ({ dispatch }) => next => action => {
    console.log("action", action)
    if (!action) {
        return
    }
    next(action)

    if (action.type !== API) return

    const {
        url,
        method,
        data,
        onSuccess,
        onFailure,
        label,
        headers,
        actionData,
        timeout,
        responseType
    } = action.payload
    const dataOrParams = ['GET'].includes(method) ? 'params' : 'data'

    if (label) {
        const payload = { type: label }
        if (actionData) payload.data = actionData
        dispatch(payload)
        dispatch(apiStart(label))
    }

    let promise = axios.request({
        url,
        method,
        headers,
        [dataOrParams]: data,
        timeout,
        responseType
    });
    promise.then(({ data: apiResponseData, headers: responseHeaders }) => {
        dispatch(onSuccess(apiResponseData, responseHeaders))
    })
        // .catch(apiResponseError => console.log(apiResponseError))
        .catch(apiResponseError => dispatch(onFailure(apiResponseError)))
        .finally(() => {
            if (label) {
                dispatch(apiEnd(label))
            }
        })
}

export default apiMiddleware