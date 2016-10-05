import template from './default.html'
import languageSwitcher from 'components/languageSwitcher/languageSwitcher'
import { switchLanguage } from '../../locale/locale'

export default {
  components: { languageSwitcher },

  template,

  computed: {
    languages () {
      return this.$store.state.locale.languages
    },
    activeLanguageCode () {
      return this.$store.state.locale.language.code
    }
  },

  methods: {
    switchLanguage
  }
}
