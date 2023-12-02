import configs from "@/configs";

const publicRouters = [
    { name: "HOME", redirect: configs.routes.home },
    { name: "MARKETPLACE", redirect: configs.routes.marketplace },
    { name: "MINT", redirect: configs.routes.mint },
    { name: "ABOUT", redirect: configs.routes.about },
    { name: "GUIDE", redirect: configs.routes.guide },
];

export { publicRouters };
