import { combineReducers } from 'redux'
import * as type from './actionType'
import util from '../assets/js/util'
import {mainRouteMap} from '../router/config'

const state = {
    userinfo:"",
    menuList:[]
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


function initMentList(menuList = state.menuList,action){
    switch (action.type) {
        case type.INITMENU:
                let menuListArr = util.getAccessRouter(mainRouteMap);
                state.menuList = menuListArr;
				return menuListArr;
		default:
			return menuList;
    }
}



const reducer = combineReducers({
    getUserInfo,
    initMentList
});

export default reducer;
