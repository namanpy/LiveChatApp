import './auth.css'
import { useState, useEffect } from 'react';
import Repo from '../repo/apiRepo';

export const Register = function() {

    const [info_message, set_info_message] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const  onRegister = async (e) => {
        e.preventDefault();
        
        try {
            let data = await Repo.createUser(username, password);

            set_info_message('Registered successfully')

        } catch(err) {
            console.log(err);
            set_info_message(err.response.data.message)

        }
    }

    useEffect(()=>{
        
    }, []);

    return (
    <div className='login_container'>
        <h3>Join us!</h3>

        <div className="input_container input">
            <label className='input_element' htmlFor='username' >Username</label>
            <input className='input_element' type='text' name='username' value={username} onChange={e => setUsername(e.target.value)}></input>

        </div>

        <div className="input_container input">
            <label className='input_element' htmlFor='password' >Password</label>
            <input className='input_element' type='password' name='password' value={password} onChange={e => setPassword(e.target.value)}></input>
        </div>

        <div className="input_container input submit">
            <input className='input_element' type='submit' name='submit' onClick={e => onRegister(e)}></input>
        </div>

        <em className='input_element' > { info_message }</em>
    </div>
    );

}


export const Login = function() {

    const [info_message, set_info_message] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const  onLogin = async (e) => {
        e.preventDefault();
        
        try {
            let data = await Repo.loginUser(username, password);

            set_info_message('Login successful, redirecting..');
            setTimeout(() => {
                window.location.href = '/rooms';
            }, 2000);
            

        } catch(err) {
            console.log(err);
            set_info_message(err.response.data.message)

        }
    }

    useEffect(()=>{
        
    }, []);

    return (
    <div className='login_container'>
        <h3>Login!</h3>

        <div className="input_container input">
            <label className='input_element' htmlFor='username' >Username</label>
            <input className='input_element' type='text' name='username' value={username} onChange={e => setUsername(e.target.value)}></input>

        </div>

        <div className="input_container input">
            <label className='input_element' htmlFor='password' >Password</label>
            <input className='input_element' type='password' name='password' value={password} onChange={e => setPassword(e.target.value)}></input>
        </div>

        <div className="input_container input submit">
            <input className='input_element' type='submit' name='submit' onClick={e => onLogin(e)}></input>
        </div>

        <em className='input_element' > { info_message }</em>
    </div>
    );

}