import Vue from 'vue'
import app from './app'

import { initLocale } from './app/locale'

initLocale().then(() => {
  new Vue(app).$mount('#app')
})
