import axios from 'axios';

export default class Repo {

    static BASE_URL = 'http://ec2-18-139-114-47.ap-southeast-1.compute.amazonaws.com:3001'
    static WS_URL = 'ws://ec2-18-139-114-47.ap-southeast-1.compute.amazonaws.com:82'
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

        let expirydate = new Date()
        expirydate.setHours(expirydate.getHours() + 12);
        let userData = { config, username, token, expirydate }
        
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
    static async getMessages(roomname, lowerlimit, upperlimit) {
        let data = await axios.post(Repo.BASE_URL + '/room/getMessages', { roomname, lowerlimit, upperlimit}, Auth.getHeader());

        return data.data;
    }


}

export class Auth {

    static logout() {

        localStorage.removeItem('userData');


    }
    static getToken() {
        return JSON.parse(localStorage.getItem('userData')).token; 
    }
    static getHeader() {
        return JSON.parse(localStorage.getItem('userData')).config; 
    }
    static getUsername() {
        return JSON.parse(localStorage.getItem('userData')).username; 
    }
    static getExpiry() {
        console.log('expiring at ', new Date(JSON.parse(localStorage.getItem('userData')).expirydate));
        return new Date(JSON.parse(localStorage.getItem('userData')).expirydate); 
    }
} 