const router = [
    {
        name: "Index", //跳转路径
        title: null, //头部展示标题
        component: require("../login/LoginHome").default, 
    },
    {
        name: "LoginDMW", //跳转路径
        title: '', //头部展示标题
        component: require("../login/LoginDMW").default,
    },
    {
        name: "EmailAndPhoneReginster", //跳转路径
        title: '', //头部展示标题
        component: require("../login/EmailAndPhoneReginster").default,
    },
    {
        name: "ForgetPassword", //跳转路径
        title: '', //头部展示标题
        component: require("../login/ForgetPassword").default,
    },
    {
        name: "FaceLogin", //跳转路径
        title: null, //头部展示标题
        component: require("../login/faceLogin/FaceLogin").default,
    },
    {
        name: "str", //跳转路径
        title: null, //头部展示标题
        component: require("../login/Text/zhys.tsx").default,
    },
    {
        name: "stren", //跳转路径
        title: null, //头部展示标题
        component: require("../login/Text/enys.tsx").default,
    },
    {
        name: "strjp", //跳转路径
        title: null, //头部展示标题
        component: require("../login/Text/jpys.tsx").default,
    },
    {
        name: "yhzh", //跳转路径
        title: null, //头部展示标题
        component: require("../login/Text/zhyh.tsx").default,
    },
    {
        name: "yhjp", //跳转路径
        title: null, //头部展示标题
        component: require("../login/Text/jpyh.tsx").default,
    },
    {
        name: "yhen", //跳转路径
        title: null, //头部展示标题
        component: require("../login/Text/enyh.tsx").default,
    },
    {
        name: "WebViewModal", //跳转路径
        title: null, //头部展示标题
        component: require("../screen/Other/WebViewModal.tsx").default,
    },
   
]
export default router
