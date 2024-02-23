import {AdminLayout} from '../layouts';
import {HomeAdmin, UserAdmin, RankingVotes, VotacionPage } from '../pages/Admin';

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
    },
    {
        path: "/admin/vote",
        layout: AdminLayout,
        component: VotacionPage,
        exact: true,
    }
];

export default routesAdmin;