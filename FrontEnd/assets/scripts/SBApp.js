export default class SBApp {

    categories = [];
    works = [];


    newWorkCard(work) {
        const Work = document.createElement('figure');
        const Img = document.createElement('img');
        const Figcaption = document.createElement('figcaption');

        Img.setAttribute('src', work.imageUrl);
        Img.setAttribute('data-id', work.id);

        Figcaption.innerHTML = work.title;

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

    newCategory(category) {
        const Category = document.createElement('li');

        Category.setAttribute('class', 'filter-item');
        Category.setAttribute('data-id', category.id);
        Category.innerHTML = category.name;

        return Category;
    }

    loadCategories(categories, activedId = 0) {
        const Categories = document.querySelector('.filters ul');
        Categories.innerHTML = '';


        categories.forEach(c => {
            const Category = this.newCategory(c);

            (c.id === activedId) && Category.classList.add('active');


            Category.addEventListener('click', (el) => {
                this.loadCategories(this.categories, Number(el.target.dataset.id));
            })
            Categories.appendChild(Category);
        });
    }

}