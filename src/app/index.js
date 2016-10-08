import { mapGetters } from 'vuex'

import template from './index.html'
import { router, store } from '../bootstrap'
import { switchLanguage } from './locale'

import languageSwitcher from 'components/languageSwitcher/languageSwitcher'

export default {
  template,

  router,

  store,

  components: { languageSwitcher },

  computed: {
    ...mapGetters([
      'languages',
      'activeLanguageCode'
    ])
  },

  methods: {
    switchLanguage
  }
}
