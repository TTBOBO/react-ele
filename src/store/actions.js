import * as type from './actionType';

export function getMenu (status,params){
    // console.log({ type:type.LOGIN,status})
    return { type:type.INITMENU,status,params};
}
