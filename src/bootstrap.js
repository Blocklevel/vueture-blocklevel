import Vue from 'vue'
import VueResource from 'vue-resource'
import { sync } from 'vuex-router-sync'
import VueRouter from 'vue-router'

import routes from './app/routes'
import store from './app/vuex/store'

/**
 * Initialize the main sass file of the application style
 */
require('./assets/sass/app.scss')

/**
 * Initialize vue-resource plugin to manage http requests
 * https://github.com/vuejs/vue-resource/tree/master/docs
 */
Vue.use(VueResource)

Vue.http.headers.common.Accept = 'application/json'
Vue.http.options.root = process.env.API_LOCATION

/**
 * Initialize vue-resource plugin to manage application routing
 * http://router.vuejs.org/en/index.html
 */
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

/**
 * Sync routes with vuex store
 */
sync(store, router)

/**
 * The debug mode is available globally in the Vue.config.debug property
 */
Vue.config.debug = process.env.NODE_ENV !== 'production'

export { router, store }
