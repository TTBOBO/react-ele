import asyncComponents from './asyncComponents';

const _import_views = file => asyncComponents(() => import(`../view/${file}`))



export const loyoutRouterMap = [
    {
        path:"/login",
        name:"登录",
        exact:true,
        component:_import_views("login/login"),
       
    }
];

export const mainRouteMap = [ {
    path:"/index",
    name:"登录",
    exact:true,
    component:_import_views("login/login"),
    icon:"13",
    title:"",
    children:[{
        path:"/test",
        name:"登录",
        exact:true,
        component:_import_views("test/test"),
        icon:"13",
        title:"测试"
    },{
        path:"/test1",
        name:"登录",
        exact:true,
        component:_import_views("test/test1"),
        icon:"13",
        title:"测试1"
    }]
}]

export const routes = loyoutRouterMap