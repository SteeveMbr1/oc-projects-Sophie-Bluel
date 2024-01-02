export default class App {

    categories = [];
    works = [];
    currentModal = null;



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
        const _Works = document.querySelector('.gallery');
        if (!_Works)
            return null;
        _Works.innerHTML = "";

        worksList.forEach(w => {
            _Works.appendChild(
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
        const _Categories = document.querySelector('.filters ul');
        if (!_Categories)
            return null;

        _Categories.innerHTML = '';


        categories.forEach(c => {
            const Category = this.newCategory(c);

            (c.id === activedId) && Category.classList.add('active');

            Category.addEventListener('click', (el) => {
                const activedId = Number(el.target.dataset.id);

                this.loadCategories(this.categories, activedId);
                this.updateWorksList(
                    this.works.filter((w) => !activedId || w.categoryId === activedId)
                )
            })
            _Categories.appendChild(Category);
        });
    }

    async login(auth) {
        const email = document.querySelector('#email').value
        const pass = document.querySelector('#password').value

        try {
            await auth(email, pass);
            window.location.replace('/')
        } catch (error) {
            const error_msg = document.querySelector('#error-msg')
            error_msg.innerHTML = error.message
        }
    }

    handleModal() {
        const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
        for (const trigger of modalTriggers) {

            trigger.addEventListener('click', () => {
                const targetId = trigger.dataset.modalTarget;
                const modal = document.getElementById(targetId);
                this.toggleModal(modal);
            });
        }
    }

    toggleModal(modal) {
        document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
        if (this.currentModal)
            this.currentModal.classList.remove('active');

        if (modal)
            modal.classList.add('active');

        return this.currentModal = modal;
    }

    preview() {
        const input = document.querySelector('.file-upload>input');
        input.addEventListener("change", () => {
            const file = input.files[0];
            if (file) {
                const fileReader = new FileReader();
                const preview = document.getElementById('file-preview');

                fileReader.onload = function (event) {
                    preview.setAttribute('src', event.target.result);
                }
                fileReader.readAsDataURL(file);
            }

        });
    }

}