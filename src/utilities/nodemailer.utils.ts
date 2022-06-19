import config from '@constants/config'
import nodemailer from 'nodemailer'

// Handle email sender with nodemailer
const transporter = nodemailer.createTransport({
  host: config.mail.MAIL_HOST,
  port: Number(config.mail.MAIL_PORT),
  secure: true,
  auth: {
    user: config.mail.MAIL_USERNAME,
    pass: config.mail.MAIL_PASSWORD,
  },
})

const nodemailerUtils = {
  transporter,
}

export default nodemailerUtils
