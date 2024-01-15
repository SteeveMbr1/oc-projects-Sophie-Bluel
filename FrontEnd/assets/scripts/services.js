const BASE_URL = "http://localhost:5678/api";

export default class Service {


    async getCategories() {
        try {
            const Response = await fetch(`${BASE_URL}/categories`);
            return await Response.json();
        } catch (error) {
            return error;
        }
    }

    async getWorks() {
        const response = await fetch(`${BASE_URL}/works`);
        return await response.json();
    }

    async postWork(data, token) {

        const RequestOptions = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: data,
            redirect: 'follow'
        };

        const Response = await fetch(`${BASE_URL}/works`, RequestOptions);
        return await Response.json();
    }

    async deleteWork(id, token) {

        const RequestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        };

        return await fetch(`${BASE_URL}/works/${id}`, RequestOptions);
    }

    async login(email, password) {

        const Raw = JSON.stringify({ email, password })

        const Response = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: Raw
        })

        if (Response.status === 401 || Response.status === 404) {
            throw new Error('Login ou mot de passe incorrect')
        }

        return await Response.json();
    }


}