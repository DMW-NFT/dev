import actionTypes from "./actionTypes"

export const LoginSuccess = (loginInfo) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: loginInfo
    }
}

export const LoginFailed = () => {
    return {
        type: actionTypes.LOGIN_FAILED,
    }
}

