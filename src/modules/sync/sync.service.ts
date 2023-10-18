import { QuestionService } from './../question/question.service'
import { Injectable } from '@nestjs/common'
import { Message, User, Game } from './interface/types'
import { DrawerConfirmDto } from './dto/game-sync.dto'

/**
 * 当玩家开始一局 "你画我猜" 的游戏时，通常会按照以下流程进行：

    游戏初始化：

    确定玩家数量：确定参与游戏的玩家数量，可以是两人或更多。
    确定游戏顺序：确定玩家的游戏顺序，可以通过随机选择或其他方法确定。
    选择绘画者：

    根据游戏顺序，选择第一个绘画者。绘画者的任务是选择一个词语或短语并开始绘画。
    绘画阶段：

    绘画者选择一个词语或短语，然后开始在纸上或绘画板上进行绘画。
    其他玩家观察绘画的过程，并尝试猜测绘画所代表的词语或短语。
    猜测阶段：

    其他玩家根据绘画者的作品进行猜测，他们可以通过口头或书写的方式提出猜测。
    绘画者可以回答猜测者的问题，但不能直接确认或否认猜测。
    猜中或时间到：

    如果有玩家猜中了绘画所代表的词语或短语，该玩家获胜并得分。
    如果没有玩家在规定的时间内猜中，绘画者可以选择揭示答案或继续绘画，直到有玩家猜中为止。
    轮换角色：

    绘画者角色传递给下一个玩家，游戏顺序向后移动一位。
    重复步骤 3-6，直到达到游戏结束的条件（例如，达到指定的回合数或分数）。
    这只是一个基本的游戏流程示例，实际的游戏可能会根据规则和参与者的要求有所变化。你可以根据自己的喜好和游戏的规则进行调整和修改。
 */

@Injectable()
export class SyncService {
  // 用户列表
  userList: Array<User> = []
  // 消息列表
  messageList: Array<Message> = []
  // 当前绘画者
  drawingUser: User = null
  // 倒计时
  timer: number = null
  //
  game: Game = null
  constructor(private readonly questionService: QuestionService) {}

  /**
   * 添加用户到用户列表
   */
  addUser(user: User) {
    const { userInfo } = user
    if (!this.userList.find(item => item.userInfo.uid === userInfo.uid)) {
      this.userList.push(user)
      return
    }
  }

  /**
   * 用户退出，在用户表中删除用户
   * @param user
   */
  removeUser(id: string) {
    const leftUserIndex = this.userList.findIndex(item => item.socket.id === id)
    const leftUser = this.userList[leftUserIndex]
    this.userList.splice(leftUserIndex, 1)
    console.log('🚀 ~ file: sync.service.ts:64 ~ SyncService ~ removeUser ~ this.userList:', this.userList)
    return {
      leftUser,
      lastUserList: this.userList
    }
  }

  /**
   * 同步canvas上面的内容
   */
  drawSync() {}

  /**
   * 新增信息到消息列表
   * TODO：这个消息的内容和答案一模一样的话就不显示出来，并且给这个玩家添加状态
   */
  addMessage(message: any) {
    const now = new Date().getTime()
    let isAnswer = false
    const { content } = message
    if (content === this.game.currAnswer) {
      isAnswer = true
    }
    const messageItem: Message = { ...message, isAnswer, date: now }
    this.messageList.push(messageItem)
    return messageItem
  }

  chat(message: any) {
    const now = new Date().getTime()
    const messageItem: Message = { ...message, date: now }
    this.messageList.push({ ...message, date: now })
    return messageItem
  }
  /**
   * 开始游戏
   * TODO：从用户列表中随机挑选一个用户作为画画那个，其他用户都是猜的人
   * TODO：从题库中选出一个题目，并且推送到前端，具体要告知的信息有题目 字数 时间
   * TODO：
   */
  async startGame() {
    try {
      // if (this.userList.length < 2) {
      //   throw new Error('至少需要两个人才能开始游戏')
      // }
      // const Questions = await this.randomChoose()
      // console.log('🚀 ~ file: sync.service.ts:93 ~ SyncService ~ startGame ~ Questions:', Questions)
      // 获取一个绘图者
      const { drawer, players } = this.getDrawer()

      drawer.socket.emit('chooseQuestion', { questions: [] })
      players.forEach(item => item.socket?.emit('choosingQuestion', {}))
    } catch (e) {
      return {
        data: e,
        success: false
      }
    }
  }

  /**
   * 第一个进来的人 可以获得开启游戏的权限
   * @returns
   */
  shouldAllow2Start(): boolean {
    return this.userList.length < 1
  }

  /**
   * 从数据库中挑选出来规定数量的题目
   */
  async randomChoose() {
    return await this.questionService.getRandomQuestions(4)
  }

  /**
   * 绘图者确认题目
   */
  async confirmQuestion(drawerConfirmDto: DrawerConfirmDto) {
    const { answer } = drawerConfirmDto
    this.game.currAnswer = answer
    return true
  }

  /**
   * 随机挑选一位绘画者
   * @returns
   */
  getDrawer() {
    const index = Math.floor(Math.random() * this.userList.length)
    console.log('🚀 ~ file: sync.service.ts:138 ~ SyncService ~ getDrawer ~ index:', this.userList)
    return {
      drawer: this.userList[index],
      players: this.userList.filter((user, i) => i !== index)
    }
  }
}
