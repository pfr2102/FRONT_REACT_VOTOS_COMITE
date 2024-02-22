import {AdminLayout} from '../layouts';
import {HomeAdmin, UserAdmin, RankingVotes} from '../pages/Admin';

const routesAdmin = [
    {
        path: "/admin",
        layout: AdminLayout,
        component: HomeAdmin,
        exact: true,
    },
    {
        path: "/admin/users",
        layout: AdminLayout,
        component: UserAdmin,
        exact: true,
    },
    {
        path: "/admin/RankingVotes",
        layout: AdminLayout,
        component: RankingVotes,
        exact: true,
    }
];

export default routesAdmin;