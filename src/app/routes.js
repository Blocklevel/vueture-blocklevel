/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file
 */
import Home from './pages/home/home'

export default [
  {
    name: 'home',
    path: '/:lang?',
    component: Home
  },
  {
    path: '/',
    redirect: '/:lang?/home'
  },
  {
    path: '/*',
    redirect: '/:lang?/'
  }
]
