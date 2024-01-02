import Services from './services.js'
import App from './app.js'

(async () => {
    const api = new Services()
    const app = new App(api)

    const works = await api.getWorks();
    const categories = await api.getCategories();


    app.worksList = works;
    app.updateWorksList();
    app.loadCategoriesFilters([{ id: 0, name: 'Tous' }, ...categories]);
    app.loadCategoriesOptions([{ id: 0, name: '' }, ...categories]);

    app.handleModal();

    app.previewPicture();

    app.postWork(api.postWork);

    if (app.isAuth()) {
        document.querySelectorAll('.auth').forEach(e => e.classList.remove('auth'))
        const logbtn = document.querySelector('nav a[href=login]');
        logbtn.innerHTML = 'logout';
        logbtn.setAttribute('href', '/');
        logbtn.addEventListener('click', (e) => {
            app.logout()
        })
    }

})()