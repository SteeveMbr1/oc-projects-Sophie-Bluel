import Services from './services.js'
import App from './app.js'

(async () => {
    const app = new App()
    const api = new Services()

    const login_btn = document.querySelector('#login-btn')

    login_btn.addEventListener('click', (el) => {
        el.preventDefault();
        app.login(api.login);
    });
})()