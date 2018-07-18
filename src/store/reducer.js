import { combineReducers } from 'redux'
import * as type from './actionType'
const state = {
    userinfo:""
}
console.log(type);
function getUserInfo(userinfo = state.userinfo,action){
    switch (action.type) {
		case type.USERINFO:
				return userinfo;
		default:
			return userinfo;
    }
}

const reducer = combineReducers({
    getUserInfo
});

export default reducer;
