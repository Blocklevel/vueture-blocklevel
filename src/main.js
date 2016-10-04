/* ============
 * Main File
 * ============
 *
 * Will initialize the application
 */
import Vue from 'vue'
import * as App from './app'
import { initLocale } from './app/locale/locale'

require('./bootstrap')

initLocale().then(() => {
  new Vue(App).$mount('#app')
})
