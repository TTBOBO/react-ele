import asyncComponents from './asyncComponents';

const _import_views = file => asyncComponents(() => import(`../view/${file}`))



export const loyoutRouterMap = [
    {
        path:"/login",
        name:"登录",
        // exact:true,
        component:_import_views("login/login"),
    }
];

export const mainRouteMap = [ {
    path:"/app/index",
    name:"index",
    exact:true,
    component:_import_views("test/test"),
    icon:"13",
    access:1,
    title:"登录",
    children:[{
        path:"/app/index/test",
        name:"test",
        exact:true,
        component:_import_views("test/test"),
        icon:"13",
        access:2,
        title:"测试"
    },{
        path:"/app/index/test1",
        name:"test1",
        exact:true,
        component:_import_views("login/login"),
        icon:"13",
        title:"测试1",
        access:3
    },{
        path:"/app/index/jc",
        name:"test1",
        exact:true,
        component:_import_views("test/jc"),
        icon:"13",
        title:"测试1",
        access:4
    }]
},{
    path:"/app/index1",
    name:"index",
    component:_import_views("test/test"),
    icon:"13",
    title:"登录",
    access:5,
    
},{
    path:"/app/index2",
    name:"index",
    component:_import_views("test/test"),
    icon:"13",
    title:"登录111",
    
}]

export const routes = loyoutRouterMap