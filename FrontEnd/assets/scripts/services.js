export default class Service {

    url = "http://localhost:5678/api";

    async getCategories() {
        let jsonResponse = null;

        try {
            const response = await fetch(this.url + "/categories");
            jsonResponse = await response.json();
        } catch (error) {
            console.log(error)
            return error;
        }

        return jsonResponse;
    }

    async getWorks() {
        let jsonResponse = null;

        try {
            const response = await fetch(this.url + '/works');
            jsonResponse = await response.json();
        } catch (error) {
            console.log(error);
            return error;
        }
        return this.works = jsonResponse;
    }

    async postWork(data, token) {
        const headers = new Headers();

        headers.append("Authorization", "Bearer " + token);


        var requestOptions = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: data,
            redirect: 'follow'
        };

        try {
            const response = fetch('http://localhost:5678/api/works', requestOptions);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    async login(email, password) {

        const raw = JSON.stringify({ email, password })

        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        })

        if (response.status === 401 || response.status === 404) {
            throw new Error('Login ou mot de passe incorrect')
        }

        return await response.json();

    }


}