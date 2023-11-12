export default class SBApi {

    token = "";
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
}