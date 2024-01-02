import Services from './services.js'
import App from './app.js'

(async () => {
    const api = new Services()
    const app = new App(api)

    const login_btn = document.querySelector('#login-btn')

    login_btn.addEventListener('click', (el) => {
        const email = document.querySelector('#email').value
        const pass = document.querySelector('#password').value

        app.login(email, pass);
        el.preventDefault();
    });
})()