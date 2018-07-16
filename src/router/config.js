import asyncComponents from './asyncComponents';

const _import_views = file => asyncComponents(() => import(`../views/${file}`))



export const loyoutRouterMap = [
    {
        path:"/login",
        name:"登录",
        exact:true,
        component:_import_views("login")
    },{
        path:"/article/:id",
        name:"文章详情",
        component:_import_views("article/article")
    },{
        path:"/videoinfo/:id",
        name:"视频详情",
        component:_import_views("article/video")
    },{
        path:"/timeArticle",
        name:"视频24小时资讯",
        component:_import_views("timeArticle/timeArticle")
    },{
        path:"/searArticle",
        name:"搜索资讯",
        component:_import_views("searArticle/searArticle")
    },{
        path:"/searResult/:keycode",
        name:"搜索结果",
        component:_import_views("searArticle/searResult")
    },{
        path:"/setting",
        name:"设置",
        component:_import_views("user/setting")
    }
];

export const routes = loyoutRouterMap