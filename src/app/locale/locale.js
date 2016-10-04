/**
 * @name
 * Locale manager
 *
 * @author
 * Matteo Gabriele <matteo@blocklevel.nl>
 *
 * @description
 * Handles internationalization and localization.
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '../store'
import _ from 'lodash'
import { router } from '../../bootstrap'
import { getItem, setItem, removeItem } from '../helpers/localStorage'
import {
  RETRIEVE_TRANSLATION,
  REMOVE_LANGUAGE_PERSISTENCY,
  CHANGE_DEFAULT_LANGUAGE_CONFIG
} from '../store/modules/locale/events'

Vue.use(VueI18n)

/**
 * Returns the current language from the localStorage if it's saved
 * or the default one from the store.
 * @return {String} code
 */
const getLanguageCode = () => {
  const { persistent, defaultCode, storageKey } = store.state.locale
  const storagedLangCode = getItem(storageKey)

  if (persistent && storagedLangCode) {
    return storagedLangCode
  }

  return defaultCode
}

/**
 * It dispatch the action to retrieve the current language translations.
 * @param  {Object}  language
 * @return {Promise}
 */
const translateBy = async (language) => {
  store.dispatch(RETRIEVE_TRANSLATION, language)

  const { unsubscribe } = await languageReady()
  unsubscribe()
}

/**
 * Changes the default configuration properties in the locale store.
 * Excepts a plain object or a promise.
 * @param  {Object|Promise}  config
 * @return {Promise}
 */
const changeDefaultConfigs = async (config) => {
  if (config && config.then) {
    config = await config
  }

  store.dispatch(CHANGE_DEFAULT_LANGUAGE_CONFIG, config)
}

const setRoutes = () => {
  router.beforeEach((to, from, next) => {
    const { language, languages, defaultCode } = store.state.locale
    const { lang } = to.params
    const detectedLanguage = _.find(languages, { urlPrefix: lang })

    /**
     * In case of a failed call to an not existing json file,
     * the store will pushing the default language as a fallback.
     * Here we just redirect the browser to the current page
     * and inject the current url prefix.
     */
    if (!detectedLanguage) {
      const { urlPrefix } = _.find(languages, { code: defaultCode })
      next({
        name: to.name,
        params: { lang: urlPrefix }
      })
      return
    }

    /**
     * Check if the detected language in the URL is also the current
     * translated language, otherwise it needs to be updated.
     * Browser language has prioriry over the store state.
     * Next method or vue-router needs to be called after the translation
     * has been retrieved or there's a chance that the application
     * is not entirely affected.
     */
    if (detectedLanguage.urlPrefix !== language.urlPrefix) {
      translateBy(detectedLanguage).then(() => next())
      return
    }

    next()
  })
}

/**
 * It subscribes to the store until the language is defined and then
 * it sets the language configuration.
 * @return {Object} the unsubscribe function from the store
 */
const languageReady = () => {
  return new Promise((resolve) => {
    const unsubscribe = store.subscribe((mutation, { locale }, store) => {
      const { language, translations, storageKey, persistent } = locale

      if (!language) {
        return
      }

      if (persistent) {
        setItem(storageKey, language.code)
      }

      Vue.locale(language.code, translations, () => {
        Vue.config.lang = language.code
      })

      resolve({ unsubscribe })
    })
  })
}

/**
 * It switched to the new selected language.
 * @param  {String} code
 * @return {Promise}
 */
export const switchLanguage = async (code) => {
  const { languages } = store.state.locale
  const language = _.find(languages, { code })
  const currentRoute = router.history.current

  await translateBy(language)

  router.replace({
    name: currentRoute.name,
    params: { lang: language.urlPrefix }
  })
}

/**
 * Initialize the i18n manager.
 * By default the language is saved in the localStorage.
 * @param  {Boolean} [persistent=true] [persistent language in localStorage]
 * @param  {Object}                    [default params configuration object]
 * @return {Promise}
 */
export const initLocale = async (config) => {
  if (config) {
    await changeDefaultConfigs(config)
  }

  const { languages, persistent, storageKey } = store.state.locale

  if (!persistent) {
    store.dispatch(REMOVE_LANGUAGE_PERSISTENCY)
    removeItem(storageKey)
  }

  const code = getLanguageCode()

  /**
   * Nothing to fancy here, just need to do it or vue-i18n won't work!
   */
  Vue.config.lang = code
  Vue.config.fallbackLang = code

  setRoutes()

  const language = _.find(languages, { code })
  await translateBy(language)
}
