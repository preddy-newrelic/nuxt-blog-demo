const newrelic = require('newrelic')
const util = require('util')

function instrumentNuxtCore(shim, nuxtcore, moduleName) {
    console.log("Instrumenting Nuxt Core with New Relic")
    console.log(nuxtcore)
    console.log("****************")
    console.log(nuxtcore)
    console.log("****************")

    //shim.setFramework('MyCustom')

    /*

    shim.wrapMiddlewareMounter(Server.prototype, ['all', 'get'], {
        route: shim.FIRST,
        wrapper: function wrapMiddleware(shim, fn, name, route) {
            return shim.recordMiddleware(fn, {
                route: route,
                type: shim.MIDDLEWARE,
                req: shim.FIRST,
                res: shim.SECOND,
                next: shim.THIRD
            })
        }
    })

    shim.recordRender(Server.prototype, 'render', {
        view: shim.FIRST,
        callback: shim.LAST
      })
    */

    //shim.record(Server.prototype, ['render'], recorderFunc)
}

function instrumentNuxtServer(shim, nuxtserver, moduleName) {
    console.log("Instrumenting Nuxt Server with New Relic")
    console.log(nuxtserver)
    console.log("****************")
    console.log(nuxtserver.Server)
    console.log("****************")

    /*
    shim.recordRender(Server.prototype, 'renderRoute', {
        view: shim.FIRST,
        callback: shim.LAST
      })
    */

    //shim.record(Server.prototype, ['render'], recorderFunc)
}

function instrumentVueServerRenderer(shim, vueServerRenderer, moduleName) {
    console.log("Instrumenting Vue Server Renderer with New Relic")
    console.log(util.inspect(vueServerRenderer, {showHidden: false, depth: 1}))
    console.log("****************")

    /*
    shim.recordRender(Server.prototype, 'renderRoute', {
        view: shim.FIRST,
        callback: shim.LAST
      })
    */

    shim.record(vueServerRenderer, ['createComponent'], vueServerRendererRecorder)
}

//    // return SegmentSpec (https://newrelic.github.io/node-newrelic/docs/SegmentSpec.html)
function vueServerRendererRecorder(shim, func, name, args) {
    console.log("Recording " + `${this.$options.name}`)
    // return SegmentSpec (https://newrelic.github.io/node-newrelic/docs/SegmentSpec.html)
    return { name: `${this.$options.name}` }
}

newrelic.instrument('@nuxt/core', instrumentNuxtCore) // failed to even capture its loading
newrelic.instrument('@nuxt/server', instrumentNuxtServer) //
newrelic.instrument('vue-server-renderer', instrumentVueServerRenderer)
require('nuxt/bin/nuxt')
