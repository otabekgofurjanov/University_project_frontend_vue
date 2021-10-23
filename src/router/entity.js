import Vue from 'vue'
import Router from 'vue-router'

//regions
const region = () => import('../components/region/region');
const regionForm = () => import('../components/region/region-form');
const regionDetail = () => import('../components/region/region-details')
//district
const district = () => import('../components/district/district');
const districtForm = () => import('../components/district/district-form');
const districtDetails = () => import('../components/district/district-details');
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/region",
            name: 'Region',
            component: region
        },
        {
            path: "/",
            name: 'Home',
            component: region
        },
        {
            path: "/region/new",
            name: 'RegionNewForm',
            component: regionForm
        },
        {
            path: "/region/:regionId/edit",
            name: 'RegionEditForm',
            component: regionForm
        },
        {
            path: "/region/:regionId/view",
            name: 'RegionView',
            component: regionDetail
        },

        //district routers

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