class App {

    static apikey = "";
    static apiUrl = "http://localhost:5678/api";

    categories = {};
    works = {};

    async getCategories() {
        let jsonResponse = null;

        try {
            const response = await fetch(App.apiUrl + "/categories");
            jsonResponse = await response.json()
        } catch (error) {
            console.log(error)
        }
        this.categories = jsonResponse;
        return jsonResponse;
    }

    async getWorks() {
        let jsonResponse = null;

        try {
            const response = await fetch(App.apiUrl + '/works');
            jsonResponse = await response.json();

        } catch (error) {
            console.log(error);
        }
        this.works = jsonResponse;
        return jsonResponse;
    }


    newWorkCard(work) {
        const Work = document.createElement('figure');
        const Img = document.createElement('img');
        const Figcaption = document.createElement('figcaption');

        Img.setAttribute('src', work.imageUrl);
        Img.setAttribute('data-id', work.id);

        Figcaption.innerHTML = work.title + ' toto';

        Work.appendChild(Img);
        Work.appendChild(Figcaption);
        return Work;
    }

    updateWorksList(worksList) {
        const Works = document.querySelector('.gallery');

        worksList.forEach(w => {
            Works.appendChild(
                this.newWorkCard(w)
            );
        });
    }

}

(async () => {
    const app = new App()

    app.updateWorksList(await app.getWorks());
    // console.log(await app.getWorks());
})()