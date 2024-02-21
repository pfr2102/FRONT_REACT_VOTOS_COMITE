import routesAdmin from './routes.admin';
import routesClient from './routes.client';

const routers = [...routesAdmin, ...routesClient];

export default routers;