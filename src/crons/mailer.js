import sendEmails from '../services/mailer'

export default {
  expression: '*/2 * * * *',
  handler: sendEmails,
}
