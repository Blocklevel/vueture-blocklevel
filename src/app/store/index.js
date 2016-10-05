/* ============
 * Vuex Store
 * ============
 *
 * The store of the application
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

// Store modules
import locale from './modules/locale/module'
import localeActions from './modules/locale/actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  /**
   * Assign the actions to the store
   */
  actions: {
    ...localeActions
  },

  /**
   * Assign the getters to the store
   */
  getters: {},

  /**
   * Assign the modules to the store
   */
  modules: {
    locale
  },

  /**
   * If strict mode should be enabled
   */
  strict: debug,

  /**
   * Plugins used in the store
   */
  plugins: debug ? [createLogger()] : []
})
