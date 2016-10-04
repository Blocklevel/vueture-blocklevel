/**
 * @name
 * Language switcher
 *
 * @author
 * Matteo Gabriele <matteo@blocklevel.nl>
 *
 * @description
 * Handles the language switch statement and shows all available languages
 */
import _ from 'lodash'
import template from './languageSwitcher.html'
require('./languageSwitcher.scss')

export default {

  template,

  props: {
    languages: {
      type: Array,
      required: true
    },
    selectedLanguage: {
      type: String,
      required: true
    },
    onChange: {
      type: Function,
      required: true
    },
    displayName: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      active: false
    }
  },

  methods: {
    selectLanguage (code) {
      this.toggleMenu()
      this.onChange(code)
    },
    toggleMenu () {
      this.$data.active = !this.$data.active
    },
    getImagePath (file) {
      return `${process.env.ASSETS}/images/icon/${file}`
    },
    isLanguageActive (code) {
      return this.selectedLanguage === code
    }
  },

  computed: {
    currentLanguage () {
      const code = this.selectedLanguage
      return _.find(this.languages, { code })
    },
    availableLanguages () {
      return this.languages
    }
  }

}
