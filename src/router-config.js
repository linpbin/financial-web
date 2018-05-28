import expend from './page/record/expend.vue'
import income from './page/record/income.vue'
import incometype from './page/record/incometype.vue'
import expendtype from './page/record/expendtype.vue'
import home from './page/home/home.vue'
import login from './page/login/login.vue'
import phone from './page/login/phone.vue'
import userinfo from './page/user/user.vue'
import query from './page/query/query.vue'
import graph from './page/query/graph.vue'
import familyinfo from './page/family/familyinfo.vue'
import familymember from './page/family/familymember.vue'
import message from './page/family/message/message.vue'
import notice from './page/family/notice/notice.vue'
import findpw from './page/login/findpw.vue'
export default [
    {
        path: '/', component: home,
    },
    // {
    //     path: '/login', component: login,
    // },
    // {
    //     path:'/findpw',component:findpw,
    // },
    // {
    //     path: '/login-phone', component: phone,
    // },
    {
        path: '/home',
        component: home,
        children: [
            {
                path: 'familyinfo',
                component: familyinfo,
            },
            {
                path: 'familymember',
                component: familymember,
            },
            {
                path: 'notice',
                component: notice,
            },
            {
                path: 'message',
                component: message,
            },
            {
                path: 'query',
                component: query,
            },
            {
                path:'graph',
                component:graph,
            },
            {
                path: 'user',
                component: userinfo,
            },
            {
                path: 'income',
                component: income,
            },
            {
                path: 'expend',
                component: expend,
            },
            {
                path:'income/type',
                component:incometype,
            },
            {
                path:'expend/type',
                component:expendtype,
            }
        ]
    },
]
