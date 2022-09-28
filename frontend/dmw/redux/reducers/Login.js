import Api from '../../Request/http';
import storage from '../../Storage/storage'
import actionTypes from '../actions/actionTypes'
const api = new Api();
// const GetStorage = api.GetStorage();

let initState = {
    isLogin: true
}
//  console.log(await GetStorage,'---');
async function FN() {
    let a = await api.GetStorage()
    initState['isLogin'] = a ? true : false
    console.log(initState['isLogin']);
}
FN()


export default (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLogin: true
            }
        case actionTypes.LOGIN_FAILED:
            return {
                isLogin: false
            }
        default:
            return state
    }
}