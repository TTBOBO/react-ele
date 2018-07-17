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
    name:"index",
    exact:true,
    component:_import_views("login/login"),
    icon:"13",
    title:"登录",
    children:[{
        path:"/test",
        name:"test",
        exact:true,
        component:_import_views("test/test"),
        icon:"13",
        title:"测试"
    },{
        path:"/test1",
        name:"test1",
        exact:true,
        component:_import_views("test/test1"),
        icon:"13",
        title:"测试1"
    }]
}]

export const routes = loyoutRouterMap