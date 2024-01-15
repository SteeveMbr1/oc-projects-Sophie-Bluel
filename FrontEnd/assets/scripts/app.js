export default class App {

    service = null;

    currentModal = null;
    worksList = [];
    categories = [];

    constructor(service) {
        this.service = service;
    }

    async init() {
        this.worksList = await this.service.getWorks();
        this.categories = await this.service.getCategories();

        this.updateWorksList();
        this.loadCategoriesFilters([{ id: 0, name: 'Tous' }, ...this.categories]);
        this.loadCategoriesOptions([{ id: 0, name: '' }, ...this.categories]);
        this.modalHandler();
        this.previewPictureHandler();
        this.postWorkHandler();
        this.uploadFormInit();
        if (this.isAuth()) {
            this.showAuthMode()
        }
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

        const Workslist = this.worksList.filter(
            w => w.categoryId === category || !category
        )

        Workslist.forEach(work => {
            Gallery.appendChild(
                this.newWorkCard(work)
            );
        });
    }

    loadWorksListModal() {
        const Gallery = document.querySelector('.modal .gallery');

        Gallery.replaceChildren();

        this.worksList.forEach(w => {
            const Work = this.newWorkCard(w)
            const Trash = document.createElement('i');

            Trash.classList.add('fa-solid', 'fa-trash');
            Trash.addEventListener('click', () => {
                this.deleteWork(w.id);
                this.worksList.splice(
                    this.worksList.indexOf(w),
                    1
                );
                Work.remove();
                this.loadWorksListModal();
                this.updateWorksList();
            })

            Work.appendChild(Trash);
            Gallery.appendChild(Work);
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

    showAuthMode() {
        document.querySelectorAll('.auth').forEach(e => e.classList.remove('auth'))
        document.querySelector('.filters').classList.add('auth');

        const Logbtn = document.querySelector('nav a[href="login.html"]');
        Logbtn.innerHTML = 'logout';
        Logbtn.setAttribute('href', '/');
        Logbtn.addEventListener('click', (e) => {
            this.logout()
        })
    }

    async postWorkHandler() {
        const form = document.querySelector('#workForm');


        form.addEventListener('submit', async e => {
            e.preventDefault();

            const data = new FormData(form);

            try {
                const work = await this.service.postWork(data, localStorage.getItem('token'));
                work.categoryId = parseInt(work.categoryId);
                this.worksList.push(work);
                this.updateWorksList();
                this.toggleModal();
                this.uploadFormInit();
            } catch (error) {
                console.error(error);
            }
        })
    }

    deleteWork(id) {
        this.service.deleteWork(id, localStorage.getItem('token'));
    }

    modalHandler() {
        const ModalTriggers = document.querySelectorAll('[data-modal-trigger]');
        for (const Trigger of ModalTriggers) {

            Trigger.addEventListener('click', () => {
                const ModalId = Trigger.dataset.modalTarget;

                this.toggleModal(
                    document.getElementById(ModalId)
                );
            });
        }

        const EdditBtn = document.querySelector('.edit-btn');
        EdditBtn.addEventListener('click', () => this.loadWorksListModal());
    }

    toggleModal(modal) {
        document.querySelectorAll('.modal.active')
            .forEach(
                m => m.classList.remove('active')
            );

        if (this.currentModal)
            this.currentModal.classList.remove('active');

        if (modal)
            modal.classList.add('active');

        return this.currentModal = modal;
    }

    previewPictureHandler() {
        const Input = document.querySelector('.upload-btn>input');

        Input.addEventListener("change", () => {
            const File = Input.files[0];

            if (File) {
                const FR = new FileReader();
                const Preview = document.getElementById('file-preview');

                FR.onload = function (event) {
                    Preview.setAttribute('src', event.target.result);
                }
                FR.readAsDataURL(File);

                document.querySelector('.input-file')
                    .setAttribute('style', 'display: none');
            }

        });
    }

    uploadFormInit() {
        document.getElementById('file-preview')
            .setAttribute('src', "assets/icons/picture.svg");

        document.querySelector('.input-file')
            .setAttribute('style', 'display: block');

        document.getElementById('workForm').reset();
    }

}