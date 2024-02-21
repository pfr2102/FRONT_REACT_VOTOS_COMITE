import {ClientLayout} from '../layouts';
import {home} from '../pages/Client';
import {Error404} from '../pages';

const routesClient = [
    {
        path: "/",
        layout: ClientLayout,
        component: home,
        exact: true
    },
    {
        path:"*",
        layout: ClientLayout,
        component: Error404,
    }    
];

export default routesClient;