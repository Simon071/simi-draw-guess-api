import { registerAs } from '@nestjs/config'

export const jwtConfig = registerAs('jwt', () => {
  return {
    secret: 'Simon071DrawGuess',
    expiredTime: '60d'
  }
})
