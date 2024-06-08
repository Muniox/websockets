import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3002, {
  cors: true,
  namespace: 'chat',
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat-msg')
  handleChatMsg(@MessageBody() msg: string, @ConnectedSocket() client: Socket) {
    console.log('Wiadomość!', msg);
    // client.send('Wiadomość odebrana!');

    // client wysyła do tego, co wysłał wiadomość, server do wszystkich

    // setTimeout(() => {
    //   client.send('Minęła sekunda!');
    // }, 1000);
    this.server.send('new-msg', msg);
  }
}
