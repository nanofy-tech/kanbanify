import nodemailer from 'nodemailer'

type EmailData = {
  from: string
  to: string
  subject: string
  text: string
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
})

export async function sendEmail(data: EmailData) {
  return await transporter.sendMail(data)
}
