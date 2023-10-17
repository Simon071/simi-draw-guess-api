import { Server, Socket } from 'socket.io'
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket
} from '@nestjs/websockets'
import { SyncService } from './sync.service'
import { User } from './interface/types'
import { Public } from 'src/common/decorator/public.decorator'

/**
 * 进入到房间的第一个人 可以开启游戏
 */
@Public()
@WebSocketGateway(4000, { transports: ['websocket'], cors: true })
export class SyncGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server
  userList: Array<User> = []
  constructor(private readonly syncService: SyncService) {}

  /**
   * 加载网关的时候
   */
  afterInit() {
    // console.log('🚀 ~ file: sync.gateway.ts:19 ~ SyncGateway ~ afterInit ~ server:', server)
  }

  /**
   * 当客户端连接到服务器的时候
   * @param client
   * @param args
   */
  handleConnection(client: Socket) {
    const shouleAllow2Start = this.syncService.shouldAllow2Start()
    if (shouleAllow2Start) client.emit('canStart', { data: true })
    this.userList.push({ socket: client })
  }

  /**
   * 当客户端与服务器断开连接时
   * @param client
   */
  handleDisconnect(client: Socket) {
    const { leftUser, lastUserList } = this.syncService.removeUser(client.id)

    // 广播用户已经离开
    this.server.emit('userLeft', {
      leftUser,
      userList: lastUserList
    })
  }

  /**
   * 获取用户信息
   * @param body
   * @param client
   */
  @SubscribeMessage('addUserInfo')
  addUserInfo(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    const { data } = body

    const index = this.userList.findIndex(item => item.socket.id === client.id)
    if (index > -1) {
      this.userList[index].userInfo = data
    }
    this.syncService.addUser(this.userList[index])
    this.server.emit('userJoined', {
      data: {
        userList: this.userList.map(item => item.userInfo)
      }
    })
  }

  /**
   * 同步用户信息
   * @param body
   * @param client
   */
  @SubscribeMessage('drawSync')
  drawSync(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    console.log('drawSync ~ SyncGateway ~ drawSync ~ body:', body)
  }

  @SubscribeMessage('chat')
  chat(@MessageBody() body: any) {
    const messageItem = this.syncService.addMessage(body)
    this.server.emit('updateMessageList', { data: { messageItem } })
  }

  @SubscribeMessage('startGame')
  startGame() {
    console.log('🚀 ~ file: sync.gateway.ts:101 ~ SyncGateway ~ startGame:')
    this.syncService.startGame()
  }

  @SubscribeMessage('confirmQuestion')
  confirmQuestion(@MessageBody() body: any) {
    this.syncService.confirmQuestion(body)
  }
}
