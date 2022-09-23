import actionTypes from "./actionTypes"

export const addnum = (val) => {
    return {
        type:actionTypes.NUMBER_ADD,
        payload:val
    }
}

export const devnum = (val) => {
    return {
        type:actionTypes.NUMBER_REMOVE,
        payload:val
    }
}