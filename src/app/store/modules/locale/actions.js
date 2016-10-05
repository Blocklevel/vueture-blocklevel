import Vue from 'vue'
import {
  CHANGE_LANGUAGE,
  RETRIEVE_TRANSLATION,
  RETRIEVE_TRANSLATION_PENDING,
  RETRIEVE_TRANSLATION_ERROR,
  REMOVE_LANGUAGE_PERSISTENCY,
  CHANGE_DEFAULT_LANGUAGE_CONFIG
} from './events'

export default {
  [CHANGE_LANGUAGE]: ({ commit }, payload) => {
    const { persistent, code } = payload
    commit(CHANGE_LANGUAGE, { persistent, code })
  },
  [RETRIEVE_TRANSLATION]: async ({ commit, state }, payload) => {
    const { defaultCode, localePath, persistent } = state.locale

    commit(RETRIEVE_TRANSLATION_PENDING)

    try {
      const { code, translateTo } = payload
      const { data } = await Vue.http.get(`${localePath}/${translateTo}.json`)

      commit(RETRIEVE_TRANSLATION, data)
      commit(CHANGE_LANGUAGE, { code, persistent })
    } catch ({ status, statusText, body }) {
      const { data } = await Vue.http.get(`${localePath}/${defaultCode}.json`)

      commit(RETRIEVE_TRANSLATION, data)
      commit(RETRIEVE_TRANSLATION_ERROR, { status, statusText, body })
      commit(CHANGE_LANGUAGE, { code: defaultCode, persistent })
    }
  },
  [RETRIEVE_TRANSLATION_PENDING]: ({ commit }) => {
    commit(RETRIEVE_TRANSLATION_PENDING)
  },
  [RETRIEVE_TRANSLATION_ERROR]: ({ commit }, payload) => {
    commit(RETRIEVE_TRANSLATION_ERROR, payload)
  },
  [REMOVE_LANGUAGE_PERSISTENCY]: ({ commit }) => {
    commit(REMOVE_LANGUAGE_PERSISTENCY)
  },
  [CHANGE_DEFAULT_LANGUAGE_CONFIG]: ({ commit }, payload) => {
    commit(CHANGE_DEFAULT_LANGUAGE_CONFIG, payload)
  }
}
