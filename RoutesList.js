import HomeModule from "./components/HomeModule";
import About from "./components/About";

const routeList = [
    {
        exact: true,
        path: "/",
        component: HomeModule
    },
    {
        exact: true,
        path: "/about",
        component: About
    },
];


export default routeList;