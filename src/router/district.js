import Vue from "vue";
import Router from "vue-router";

const district = () => import('../components/district/district');
const districtForm = () => import('../components/district/district-form');
const districtDetails = () => import('../components/district/district-details');
Vue.use(Router)

export default new Router({
    mode: 'district',
    routes: [
        {
            path: '/district',
            name: 'district',
            component: district
        },
        {
            path: '/district/new',
            name: 'districtNew',
            component: districtForm
        },
        {
            path: '/district/:districtId/edit',
            name: 'districtEdit',
            component: districtForm
        },
        {
            path: '/district/:districtId/view',
            name: 'districtView',
            component: districtDetails
        }
    ]
})
