import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _a07d80e0 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages\\index" */).then(m => m.default || m)
const _35558062 = () => import('..\\pages\\advertising.vue' /* webpackChunkName: "pages\\advertising" */).then(m => m.default || m)
const _f6d62650 = () => import('..\\pages\\wallets.vue' /* webpackChunkName: "pages\\wallets" */).then(m => m.default || m)
const _8430a932 = () => import('..\\pages\\profile.vue' /* webpackChunkName: "pages\\profile" */).then(m => m.default || m)
const _3794ee06 = () => import('..\\pages\\portfolio.vue' /* webpackChunkName: "pages\\portfolio" */).then(m => m.default || m)
const _97eda924 = () => import('..\\pages\\exchanges.vue' /* webpackChunkName: "pages\\exchanges" */).then(m => m.default || m)
const _94c7ba80 = () => import('..\\pages\\coins.vue' /* webpackChunkName: "pages\\coins" */).then(m => m.default || m)
const _59befdc5 = () => import('..\\pages\\terms.vue' /* webpackChunkName: "pages\\terms" */).then(m => m.default || m)
const _795a56c3 = () => import('..\\pages\\coin.vue' /* webpackChunkName: "pages\\coin" */).then(m => m.default || m)
const _42dfe566 = () => import('..\\pages\\disclaimer.vue' /* webpackChunkName: "pages\\disclaimer" */).then(m => m.default || m)
const _0cec3dc6 = () => import('..\\pages\\privacy.vue' /* webpackChunkName: "pages\\privacy" */).then(m => m.default || m)



const scrollBehavior = (to, from, savedPosition) => {
  // SavedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // If no children detected
    if (to.matched.length < 2) {
      // Scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // If one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // If link has anchor, scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/",
			component: _a07d80e0,
			name: "index"
		},
		{
			path: "/advertising",
			component: _35558062,
			name: "advertising"
		},
		{
			path: "/wallets",
			component: _f6d62650,
			name: "wallets"
		},
		{
			path: "/profile",
			component: _8430a932,
			name: "profile"
		},
		{
			path: "/portfolio",
			component: _3794ee06,
			name: "portfolio"
		},
		{
			path: "/exchanges",
			component: _97eda924,
			name: "exchanges"
		},
		{
			path: "/coins",
			component: _94c7ba80,
			name: "coins"
		},
		{
			path: "/terms",
			component: _59befdc5,
			name: "terms"
		},
		{
			path: "/coin",
			component: _795a56c3,
			name: "coin"
		},
		{
			path: "/disclaimer",
			component: _42dfe566,
			name: "disclaimer"
		},
		{
			path: "/privacy",
			component: _0cec3dc6,
			name: "privacy"
		}
    ],
    fallback: false
  })
}
