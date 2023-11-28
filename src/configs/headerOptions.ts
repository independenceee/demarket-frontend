import routes from "@/configs/routes";

const headerOptions = [
    { text: "HOME", redirect: routes.home },
    { text: "MARKETPLACE", redirect: routes.marketplace },
    { text: "MINT", redirect: routes.mint },
    { text: "ABOUT", redirect: routes.about },
    { text: "GUIDE", redirect: routes.guide },
];

export default headerOptions;
