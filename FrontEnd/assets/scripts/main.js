import Services from './services.js'
import App from './app.js'

(async () => {
    const app = new App()
    const api = new Services()

    const Works = await api.getWorks();
    const Categories = await api.getCategories();

    app.categories.push({ id: 0, name: 'Tous' })
    app.categories.push(...Categories)

    app.works.push(...Works)


    app.updateWorksList(app.works);
    app.loadCategories(app.categories);

    app.handleModal();

    app.preview();

})()