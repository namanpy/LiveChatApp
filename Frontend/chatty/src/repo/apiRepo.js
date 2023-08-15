import axios from 'axios';

export default class Repo {

    static BASE_URL = 'http://localhost:3001'
   
    static async createUser(username, password) {
        
        let data = await axios.post(Repo.BASE_URL + '/user/create', { username, password });

        return data;
    }

    static async loginUser(username, password) {
        let data = (await axios.post(Repo.BASE_URL + '/user/login', { username, password })).data;
        const token = data.token;

        const config = {

            headers : {}
        }
        config.headers.authorization = 'Bearer ' + token;

        let userData = { config, username, token }
        
        localStorage.setItem('userData',JSON.stringify(userData));
        return data;
    }

    static async createRoom(roomname, description) {
        let data = await axios.post(Repo.BASE_URL + '/room/create', { roomname, description }, Auth.getHeader());

        return data.data;
    }

    static async getRoomList() {
        let data = await axios.post(Repo.BASE_URL + '/room/all', {}, Auth.getHeader());

        return data.data;
    }


}

export class Auth {

    static getToken() {
        return JSON.parse(localStorage.getItem('userData')).token; 
    }
    static getHeader() {
        return JSON.parse(localStorage.getItem('userData')).config; 
    }
    static getUsername() {
        return JSON.parse(localStorage.getItem('userData')).username; 
    }
} 