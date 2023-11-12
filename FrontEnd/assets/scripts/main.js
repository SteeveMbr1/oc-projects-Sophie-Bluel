import SBApi from './SBApi.js'
import SBApp from './SBApp.js'

(async () => {
    const app = new SBApp()
    const api = new SBApi()

    const Works = await api.getWorks();
    const Categories = await api.getCategories();

    app.categories.push({ id: 0, name: 'Tous' })
    app.categories.push(...Categories)


    app.updateWorksList(Works);
    app.loadCategories(app.categories);


})()