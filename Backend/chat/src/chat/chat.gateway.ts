import { SubscribeMessage, WebSocketGateway, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessageService } from 'src/message/message.service';


class ChatRoom {

  private users : string[] = [];
  private userToSocket = {};
  private socketToUser = {};
  private onlinecount = 0;

  getUsers() : string[] {
    return this.users;
  }

  getOnlineUsers() : string[] {
    return this.users;
  }
  getUserSocket(username : string) : Socket {
    return this.userToSocket[username];

  }

  addUser(socket : Socket, username :string) : Boolean {
    console.log('addUser ', username);

    if(this.users.includes(username)) {
      console.log(' username ', username , " already there , removing him first.");
      this.removeUserByUsername(username);
    }
      this.users.push(username);
      
      this.userToSocket[username] = socket;
      this.socketToUser[socket.id] = username;

      this.onlinecount += 1;
      return true;

    return false;
  }



  removeUser(socket : Socket) : Boolean {

    const username = this.socketToUser[socket.id];
    console.log('removeUser ', username);
    if(this.users.includes(username)) {
      this.users= this.users.filter( name => { if(name !== username) return name; });
      delete this.userToSocket[username];
      delete this.socketToUser[socket.id];
      this.onlinecount -= 1;
      return true;
    }
    return false;
  }
  removeUserByUsername( username : string) : Boolean {

 
    if(this.users.includes(username)) {
      this.users= this.users.filter( name => { if(name !== username) return name; });
      const socket =  this.userToSocket[username];
      delete this.socketToUser[socket.id];
      delete this.userToSocket[username];
      this.onlinecount -= 1;
      return true;
    }
    return false;
  }
  
  
}
type ChatRoomList = {
  [room : string  ] : ChatRoom

 };



@WebSocketGateway(82, { cors : true })
export class ChatGateway implements OnGatewayDisconnect {
  
  private roomList : ChatRoomList = {};
  private userToRoomMap = {};
  constructor(private readonly messageService : MessageService) {}


  @SubscribeMessage('join')
  handleJoin(socket : Socket, data : any) {

    console.log("joined with socket id ", socket.id, ' and username ', data.username);
    if(!data.username) return;
    if(!data.roomname) return;
    const roomname = data.roomname;
    const username = data.username;

    if(!this.roomList[roomname]) {

      this.roomList[roomname] = new ChatRoom();

      this.roomList[roomname].addUser(socket, username);
      this.userToRoomMap[socket.id] = roomname; 


      this.roomList[roomname].getUsers().forEach(name => {
        this.roomList[roomname].getUserSocket(name).emit("receiveOnlineUserList", { users : this.roomList[roomname].getUsers(),  roomname : roomname } )
      });
        
  
      
      return;

    }
    this.roomList[roomname].addUser(socket, username);
    this.userToRoomMap[socket.id] = roomname; 
    this.roomList[roomname].getUsers().forEach(name => {
      this.roomList[roomname].getUserSocket(name).emit("receiveOnlineUserList", { users : this.roomList[roomname].getUsers() , roomname : roomname} )
    });
    return ;
  }

  @SubscribeMessage('createmessage')
  createMessage(socket : Socket, data : any) {

    const roomname = data.roomname;
    const username = data.username;
    const body     = data.body;
    console.log('creating msg');
    if(this.roomList[roomname]) {

      console.log("came here ")
      this.messageService.createMessage(body, username, roomname);
      
      console.log(this.roomList[roomname].getUsers());
      this.roomList[roomname].getUsers().forEach(name => {
      
        this.roomList[roomname].getUserSocket(name).emit("receiveOnlineUserList", { users :  this.roomList[roomname].getUsers(),  roomname : roomname } )
      });
      return;

    }
    return false;
  }

  @SubscribeMessage('getonlineusers')
  getOnlineUsers(socket : Socket, data : any)  {
    const roomname = data.roomname;
    if(!this.roomList[roomname]) {

      socket.emit(
        'receiveOnlineUserList', 
        { user : [], roomname }
      );
      return;
    }
    console.log( { user : this.roomList[roomname].getOnlineUsers(), roomname })
    socket.emit(
      'receiveOnlineUserList', 
      { user : this.roomList[roomname].getOnlineUsers(), roomname }
    );
  }
  
  handleDisconnect(socket : Socket) {
    console.log('disconnected');
    console.log(this.userToRoomMap);
    const roomname = this.userToRoomMap[socket.id];
    if(this.roomList[roomname]) 
    { 
      this.roomList[roomname].removeUser(socket);
    }
  }

  
  
} 
