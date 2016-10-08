import _ from 'lodash'
import {
  CHANGE_LANGUAGE,
  RETRIEVE_TRANSLATION,
  RETRIEVE_TRANSLATION_PENDING,
  RETRIEVE_TRANSLATION_ERROR,
  REMOVE_LANGUAGE_PERSISTENCY,
  CHANGE_DEFAULT_LANGUAGE_CONFIG
} from './events'

export const state = {
  storageKey: 'app_language',
  defaultCode: 'en-GB',
  localePath: 'static/locale',
  language: null,
  translations: null,
  languages: [
    {
      code: 'en-GB',
      urlPrefix: 'en',
      name: 'EN',
      translateTo: 'en-GB'
    },
    {
      code: 'nl-NL',
      urlPrefix: 'nl',
      name: 'NL',
      translateTo: 'nl-NL'
    }
  ],
  pending: false,
  error: false,
  errorMessage: null,
  persistent: true
}

export const mutations = {
  [CHANGE_DEFAULT_LANGUAGE_CONFIG] (state, payload) {
    const {
      defaultCode,
      persistent,
      localePath,
      availableLanguages
    } = payload

    // @todo: refactor if statements!

    if (defaultCode) {
      state.defaultCode = defaultCode
    }

    if (persistent) {
      state.persistent = persistent
    }

    if (localePath) {
      state.localePath = localePath
    }

    if (availableLanguages) {
      state.languages = _.map(availableLanguages, (code) => {
        return _.find(state.languages, { code })
      })
    }
  },
  [CHANGE_LANGUAGE] (state, payload) {
    const { code, persistent } = payload
    state.language = _.find(state.languages, { code })
    state.persistent = persistent
  },
  [RETRIEVE_TRANSLATION_PENDING] (state) {
    state.pending = true
  },
  [RETRIEVE_TRANSLATION] (state, payload) {
    state.pending = false
    state.error = false
    state.errorMessage = null
    state.translations = payload
  },
  [RETRIEVE_TRANSLATION_ERROR] (state, payload) {
    state.error = true
    state.pending = false
    state.errorMessage = payload
  },
  [REMOVE_LANGUAGE_PERSISTENCY] (state) {
    state.persistent = false
  }
}
