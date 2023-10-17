import { Socket } from 'socket.io'
export interface User {
  socket: Socket
  userInfo?: UserInfo
  score?: number
}

interface UserInfo {
  uid: string
  username: string
}

export interface Message {
  uid: string
  username: string
  content: string
  date: number
  isAnswer?: boolean
}

export interface Game {
  // 当前的题目名称
  currAnswer: string
  // 当前的游戏回合
  currRound: number
  // 这个游戏的总回合数
  totalRound: number
  /**
   * 游戏中的用户列表
   * 用户有用户信息：
   *  uid(用户id)
   *  username(用户名)
   *  scores(用户的得分情况)
   *  isFinish(用户当前是否已经回答出问题)
   *  role(绘画者或者玩家)
   */
  userList: GameUserInfo[]
  /**
   * 回合历史记录
   */
  roundInfoList: RoundInfoList[]
}

export interface GameUserInfo {
  uid: string
  username: string
  scores: number
  isFinish: boolean
  role: 'drawer' | 'player'
}

export interface RoundInfoList {
  answer: ''
  userList: GameUserInfo[]
}
