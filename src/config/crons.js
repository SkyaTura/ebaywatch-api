import cron from 'node-cron'
import fs from 'fs'

export default () => {
  const cronsDir = './src/crons/'
  const loadCron = file => {
    if (['index.js', 'utils'].indexOf(file) > -1) return
    const fileName = file.split('.')[0]
    console.info(`💼 Loaded cron: ${fileName}`)
    // eslint-disable-next-line
    const { expression, handler, options } = require(`../crons/${file}`).default
    cron.schedule(expression, handler, options)
  }

  fs.readdirSync(cronsDir).forEach(loadCron)
}
