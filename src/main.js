import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router/entity'
import {BootstrapIconsPlugin} from 'bootstrap-icons-vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


Vue.use(BootstrapIconsPlugin);
Vue.use(VueSweetalert2);

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
