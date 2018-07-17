import asyncComponents from './asyncComponents';

const _import_views = file => asyncComponents(() => import(`../view/${file}`))



export const loyoutRouterMap = [
    {
        path:"/login",
        name:"登录",
        exact:true,
        component:_import_views("login/login")
    },
    {
        path:"/home",
        name:"",
        exact:true,
        component:_import_views("container")
    }
];

export const mainRouteMap = [ {
    path:"/index",
    name:"登录",
    exact:true,
    component:_import_views("login/login")
}]

export const routes = loyoutRouterMap