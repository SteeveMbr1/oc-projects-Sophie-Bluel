import Services from './services.js'
import App from './app.js'

(async () => {
    const app = new App()
    const api = new Services()

    const Works = await api.getWorks();
    const Categories = await api.getCategories();


    app.worksList = Works;
    app.updateWorksList();
    app.loadCategoriesFilters([{ id: 0, name: 'Tous' }, ...Categories]);
    app.loadCategoriesOptions([{ id: 0, name: '' }, ...Categories]);

    app.handleModal();

    app.preview();

    app.postWork(api.postWork);

})()