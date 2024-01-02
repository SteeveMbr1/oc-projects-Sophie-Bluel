const BASE_URL = "http://localhost:5678/api";

export default class Service {


    async getCategories() {
        try {
            const response = await fetch(`${BASE_URL}/categories`);
            return await response.json();
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    async getWorks() {
        const response = await fetch(`${BASE_URL}/works`);
        return await response.json();
    }

    async postWork(data, token) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: data,
            redirect: 'follow'
        };

        const response = await fetch(`${BASE_URL}/works`, requestOptions);
        return await response.json();
    }

    async deleteWork(id, token) {

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        };

        const response = await fetch(`${BASE_URL}/works/${id}`, requestOptions);
        return response;

    }

    async login(email, password) {

        const raw = JSON.stringify({ email, password })

        const response = await fetch(`${BASE_URL}/users/login`, {
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