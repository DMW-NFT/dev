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
   
]
export default router
