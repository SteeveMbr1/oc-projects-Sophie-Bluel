import Services from './services.js'
import App from './app.js'

(async () => {
    const _api = new Services()
    const _app = new App(_api)


    _app.init();

})()