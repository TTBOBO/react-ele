import asyncComponents from './asyncComponents';

const _import_views = file => asyncComponents(() => import(`../view/${file}`))



export const loyoutRouterMap = [
    {
        path:"/login",
        name:"登录",
        // exact:true,
        component:_import_views("index"),
    }
];

export const mainRouteMap = [,{
    path:"/app/index",
    name:"index",
    component:_import_views("index"),
    icon:"13",
    title:"首页",
    access:5,
    
}, {
    path:"/app/index3",
    name:"index3",
    exact:true,
    component:_import_views("test/test"),
    icon:"13",
    access:1,
    title:"文章管理",
    children:[{
        path:"/app/index/test",
        name:"test",
        exact:true,
        component:_import_views("test/test"),
        icon:"13",
        access:2,
        title:"文章发布"
    },{
        path:"/app/index/test1",
        name:"test1",
        exact:true,
        component:_import_views("login/login"),
        icon:"13",
        title:"文章审核",
    },{
        path:"/app/index/jc",
        name:"test1",
        exact:true,
        component:_import_views("test/jc"),
        icon:"13",
        title:"文章类别管理",
    }]
},{
    path:"/app/index1",
    name:"index",
    component:_import_views("test/jc"),
    icon:"13",
    title:"登录",
    access:5,
    
},{
    path:"/app/index2",
    name:"index",
    component:_import_views("login/login"),
    icon:"13",
    title:"登录111",
    
}]

export const routes = loyoutRouterMap