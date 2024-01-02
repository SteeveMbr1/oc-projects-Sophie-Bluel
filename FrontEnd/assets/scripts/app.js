export default class App {

    service = null;

    currentModal = null;
    worksList = [];
    categories = [];

    constructor(service) {
        this.service = service;

    }

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

    updateWorksList(category = 0) {
        const Gallery = document.querySelector('.gallery');

        Gallery.replaceChildren();

        const workslist = this.worksList.filter(
            w => w.categoryId === category || !category
        )

        workslist.forEach(work => {
            Gallery.appendChild(
                this.newWorkCard(work)
            );
        });
    }

    loadWorksListModal() {
        const Gallery = document.querySelector('.modal .gallery');

        Gallery.replaceChildren();

        this.worksList.forEach(w => {
            const work = this.newWorkCard(w)
            const trash = document.createElement('i');

            trash.classList.add('fa-solid', 'fa-trash');
            trash.addEventListener('click', () => {
                console.log('click');
                this.deleteWork(w.id);
                this.worksList.splice(
                    this.worksList.indexOf(w),
                    1
                );
                work.remove();
                this.loadWorksListModal();
                this.updateWorksList();
            })

            work.appendChild(trash);
            Gallery.appendChild(work);
        });
    }

    updateCategoriesFilter(filter) {
        const CategoriesFilter = document.querySelector('.filters ul');

        CategoriesFilter.querySelector('.active').classList.remove('active');

        filter.classList.add('active');
    }

    loadCategoriesFilters(categories) {
        const CategoriesFilter = document.querySelector('.filters ul');

        CategoriesFilter.innerHTML = categories.map(c => {
            return `<li class="filter-item" data-id="${c.id}" >${c.name}</li>`;
        }).join('');

        CategoriesFilter.firstChild.classList.add('active')
        CategoriesFilter.childNodes.forEach(c => {
            c.addEventListener('click', () => {
                this.updateCategoriesFilter(c);
                this.updateWorksList(Number(c.dataset.id));
            })
        })
    }

    loadCategoriesOptions(categories) {
        const CategoryOptions = document.querySelector('select#categorie');
        CategoryOptions.innerHTML = categories.map(e => {
            return `<option value="${e.id}">${e.name}</option>`
        }).join('');
    }

    async login(email, pass) {

        try {
            const json = await this.service.login(email, pass);
            localStorage.setItem('token', json.token)
            window.location.replace('/')
        } catch (error) {
            const error_msg = document.querySelector('#error-msg')
            error_msg.innerHTML = error.message
        }
    }

    isAuth() {
        return !!localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
    }

    async postWork(post) {
        const form = document.querySelector('#workForm');


        form.addEventListener('submit', async e => {
            e.preventDefault();

            const data = new FormData(form);
            try {
                const work = await post(data, localStorage.getItem('token'));
                this.worksList.push(work);
                this.updateWorksList();
                this.toggleModal();
            } catch (error) {
                console.log(error);
            }
        })
    }

    deleteWork(id) {
        this.service.deleteWork(id, localStorage.getItem('token'));
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

        const edditBtn = document.querySelector('.edit-btn');
        edditBtn.addEventListener('click', () => this.loadWorksListModal());
    }

    toggleModal(modal) {
        document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
        if (this.currentModal)
            this.currentModal.classList.remove('active');

        if (modal)
            modal.classList.add('active');

        return this.currentModal = modal;
    }

    previewPicture() {
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