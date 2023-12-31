import * as dotenv from 'dotenv'
const envFiles = {
  production: '.env.pro',
  //   test: '.test.env',
  development: '.env.dev'
}

async function getEnvConfig() {
  let envFile = '.env'
  envFile = envFiles[process.env.ENV]
  dotenv.config({ path: envFile }) // 读取指定的 .env 文件
}

getEnvConfig()
