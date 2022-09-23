import actionTypes from "../actions/actionTypes"

const initState = {
    num: 1
}

export default (state = initState.num, action) => {
    switch (action.type) {
        case actionTypes.NUMBER_ADD:
            return {
                ...state,
                num: state.num + action.payload
            }

        case actionTypes.NUMBER_REMOVE:
            return {
                ...state,
                num: state.num - action.payload
            }

            default : return  state
    }
}