import { useEffect, useState, useRef } from "react"
import Repo, { Auth } from "../repo/apiRepo"
import './roomlist.css'
import io from 'socket.io-client';
export const RoomList = () => {

    const  [roomlist, setRoomlist] = useState([]);
    const [roomname, setRoomname] = useState("");
    const [description, setDescription] = useState("");
    const [info_message, set_info_message] = useState(undefined);
    const [onlineusers, setOnlineUsers] = useState({ "bedroom" : 0});
    const socket = useRef();
    const generateColor = () => {
        const color = Math.random().toString(16).substr(-6);
        console.log(color);
        return color;
    };

    async function func() {
        try {
            let data = await Repo.getRoomList();

            data.room.forEach(
                (room) => {
                    if(socket.current) socket.current.emit('getonlineusers', { roomname : room.roomname });
                }
            );
            setRoomlist(data.room);
        } 
        catch(err) {
            console.log(err)
        }
    }

    const onCreateRoom = async e => {
        try {
            let data = await Repo.createRoom(roomname, description);

            set_info_message('Created room '+ roomname);
            func();
            

        } catch(err) {
            console.log(err);
            set_info_message(err.response.data.message)

        }

    };
    useEffect(
        () => {


            const socket_ = io(Repo.WS_URL);
            socket.current = socket_;
            socket_.on('connect', () => {
                console.log('connected to ws');
            });

            socket_.on('receiveOnlineUserList', (data) => {

                setOnlineUsers(
                    (onlineusers) => {
                        onlineusers[data.roomname] = data.user.length;
                        const newOnlineusers = JSON.parse(JSON.stringify(onlineusers));
                        return newOnlineusers;
                    }
                );
            })

            func();
        }
    , []);


    return (
        <div >
            <div className="main_container">
                <div className="sidebar"> 
                    <div className='room_container'>
                        <h3>Create your own</h3>

                        <div className="input_container input">
                            <label className='input_element' htmlFor='username' >Room Name</label>
                            <input className='input_element' type='text' name='username' value={roomname} onChange={e => setRoomname(e.target.value)}></input>

                        </div>

                        <div className="input_container input">
                            <label className='input_element' htmlFor='password' >Description</label>
                            <textarea className='input_element' rows={10}  value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        </div>

                        <div className="input_container input submit">
                            <input className='input_element' type='submit' name='submit' onClick={e => onCreateRoom(e)}></input>
                        </div>

                        <em className='input_element' > { info_message }</em>
                    </div>
{/* 
                    <div className='room_container'>
                        <h3>Your rooms</h3>

    
                    </div> */}
                </div>
                <div className="room_info_container">

                    <div> <h2>Lets join a room!</h2></div>
                    { roomlist.map(
                        room => {

                            return (
            
                                <div className="room_list" > 
                                    <div className="room_list_item room_name">
                                       
                                       
                                        <div className="circle room_name_item" style={ { backgroundColor : '#' + generateColor() } }> </div>
                                        
                                        <div className="room_name_item" style={{ marginLeft : '1rem' }}>
                                            <h4 > {  room.roomname }</h4>
                                        </div>

                                        <div className="room_name_item" style={{ marginLeft : '3rem' }}> 
                                            <em> { '- ` ' + room.description + ' ` ' } </em>
                                        </div>
                                
                                  
                                    </div>
                                    <div className="room_list_item"> 
                                           <b>{ onlineusers[room.roomname] } users online</b>
                                    </div>
                                    
                                    <div className="room_list_item"> 
                                           <button onClick={ () => window.location.href= '/room/' + room.roomname } > Join Room </button>
                                    </div>

                                </div>
                            
                            );
                        }
                    ) }
                </div>
                <div className="sidebar-right"> 
                    
                </div>
            </div>
        </div>
    );
}