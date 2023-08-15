import { useEffect, useState } from "react"
import Repo, { Auth } from "../repo/apiRepo"
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import './roomlist.css'
import './room.css'
let socket= undefined;

export const Room = (props) => {

    const  [messagelist, setMessagelist] = useState([]);
    const  [message, setMessage] = useState("");
    const  [socket, setSocket] = useState();
    const  {roomname} = useParams();
    const generateColor = () => {
        const color = Math.random().toString(16).substr(-6);
        console.log(color);
        return color;
    };

    
    const sendMessage = (msg) => {
        console.log('emit')
        socket.emit('createmessage', 
        {
            body : message,
            username : Auth.getUsername(),
            roomname : roomname,
            token : Auth.getToken()
        });
    }

    useEffect(
        () => {
            async function func() {
                let socket = io('ws://localhost:82');
                setSocket(socket);
                socket.on('connect', () => {
                    console.log('connected to ws');
                    socket.emit('join', { roomname, username : Auth.getUsername() })
                })

                socket.on('message', (data) => {
                    console.log(data);
                    setMessagelist([...messagelist, data]);
                })
            }
            func();
        }
    , []);


    return (
        
        <div >
            { Auth.getToken() ? '' : window.location.href = '/login' }
            <div className="main_container">
                <div className="sidebar"> 
                    <div className='room_container'>
                        <h3>Users online</h3>

                        <div> Naman </div>

    
                    </div>
                </div>
                <div className="room_info_container">

                    <div> <h2>Lets join a room!</h2></div>
                    { messagelist.map(
                        room => {

                            return (
            
                                <div className="message_list" > 
                                    

                                </div>
                            
                            );
                        }
                    ) }
                </div>
                <div className="sidebar-right"> 
                    
                </div>
            </div>

            <div className='message_input'>

                <div className='left_filler'>

                </div>

                <div className='message_box'>
                    <input className="message_input" type='text' name='message' value={message} onChange={ (e) => { setMessage(e.target.value) } } ></input>
                    <input className="message_submit"  type='submit' name='submit'  onClick = { (e)=> { sendMessage(e) }}></input> 
                </div>

                <div className='right_filler' >
                        
                </div>


            </div>
        </div>
    );
}