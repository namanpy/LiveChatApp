import { useRef, useEffect, useState } from "react"
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
    const  incrementAmt = 25;
    const  [lowerlimit, setLowerlimit] = useState(0);
    const  [upperlimit, setUpperlimit] = useState(incrementAmt);
    const  [firstFetch, setfirstFetch] = useState(true);
    const  [onlineusers, setOnlineUsers] = useState([]);
    const ref = useRef(0);


    async function fetchOld( lowerlimit, upperlimit) {

        try {
            console.log('fetching old with lower ', lowerlimit, ' and upper ', upperlimit);
            let data = await Repo.getMessages(roomname, lowerlimit, upperlimit);

            let messages = [];
            data.messages.forEach(msg => {
                messages.push( {
                    username : msg.byUser,
                    body  : msg.body,
                    createdAt : msg.createdAt
                }
                );
            });

            setMessagelist(
                (messagelist) => { 
                    return [ ...messagelist, ...messages ]  
                }
            )
            setfirstFetch(false);
        } 
        catch(err) {
            console.log(err)
        }
    }
    
    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('createmessage', 
        {
            body : message,
            username : Auth.getUsername(),
            roomname : roomname,
            token : Auth.getToken()
        });
    }

    const onScroll = () => {
        if( -Math.floor( ref.current.scrollTop ) === ref.current.scrollHeight - ref.current.offsetHeight){

            fetchOld(lowerlimit + incrementAmt, upperlimit+incrementAmt);
            setLowerlimit(lowerlimit + incrementAmt);
            setUpperlimit(upperlimit + incrementAmt);
            ref.current.scrollTop = ref.current.scrollTop + 1;
        }
        
    }

    const getOnlineStatus = (username) => {
        if(onlineusers[username]) { return 'green'}
        return 'red';
    }
    useEffect(
        () => {
            
                let socket_ = io(Repo.WS_URL);
                setSocket(socket_);
                socket_.on('connect', () => {
                    console.log('connected to ws');
                    socket_.emit('join', { roomname, username : Auth.getUsername() })
                })

                socket_.on('message', (data) => {
                    console.log("message aaaya!");
                    setMessagelist(
                        (messagelist) => { return [{ body : data.body, username : data.username } , ...messagelist ] });
                })
                
                
                socket_.on('receiveOnlineUserList', (data) => {
                    setOnlineUsers(
                        (onlineusers) => { return [...data.users] });
                })

                fetchOld(lowerlimit, upperlimit).then(
                    () => { console.log( "setting to", ref.current.scrollHeight  ); ref.current.scrollTop = ref.current.scrollHeight }
                );
                
            
        }
    , []);

    useEffect( () => {
        if(firstFetch) {
     
           setTimeout( () =>  {
            console.log( "setting to fianl", ref.current.scrollHeight  );
            ref.current.scrollTop = ref.current.height }, 3000);
        }
    }, [messagelist])

    return (
        
        <div >
            { Auth.getToken() ? '' : window.location.href = '/login' }
            <div className="main_container">
                <div className="sidebar"> 
                    <div className='room_container'>
                        <h3>Users online</h3>

                        { onlineusers.map(
                            (item) => {

                                return <div> { item } </div>
                            }
                        ) }
                        

    
                    </div>
                </div>
                <div className="message_info_container" ref = {ref} onScroll={(e) => onScroll()}>

                    
                    { messagelist.map(
                        (msg, index) => {
                            console.log(messagelist.length);
                            if(msg.username === Auth.getUsername()) {
                                return (
                
                                    <div className="message_list" > 
                                        <div className="message_list_item reverse">
                                        
                                            <div className="message_sub_item chat_reverse" style={{ marginLeft : '1.5rem' }}> 
                                                <em> { '` ' + msg.body + ' `' } </em>
                                            </div>  
                                        </div>
                                    </div>
                                
                                );
                            }
                            return (
            
                                <div className="message_list" > 
                                    <div className="message_list_item ">
                                       
                                       <div className="message_sub_item">
                                            <div className="online_circle circle" style={ { backgroundColor : getOnlineStatus()  } }> </div>

                                       </div>
                                       
                                       <div className="message_sub_item" style={{ marginLeft : '1rem' }}>
                                           <h4 > {  msg.username }</h4>
                                       </div>

                                       <div className="message_sub_item chat" style={{ marginLeft : '3rem' }}> 
                                           <em> { '- ` ' + msg.body + ' ` ' } </em>
                                       </div>  
                                   </div>
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