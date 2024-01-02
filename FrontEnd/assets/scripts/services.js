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

    async addWork() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMDQ4ODMzNCwiZXhwIjoxNzAwNTc0NzM0fQ.9IcNt3xx-TRes1rx-8QHWFEtHVnUul_THAowYPNvQgU");

        var file = "<file contents here>";

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: file,
            redirect: 'follow'
        };
    }

    async auth(email, password) {

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