import { type Adapter } from 'next-auth/adapters'
import EmailProvider from 'next-auth/providers/email'
import { type Theme, type NextAuthOptions } from 'next-auth'
import { createTransport } from 'nodemailer'
import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@auth/prisma-adapter'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const SMTP_HOST = process.env.SMTP_HOST
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: SMTP_HOST,
        port: 587,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
        from: 'contato@nanofy.com.br',
        tls: {
          rejectUnauthorized: true,
        },
      },

      async sendVerificationRequest(params) {
        const { identifier, url, provider, theme } = params
        const { host } = new URL(url)

        const transport = createTransport(provider.server)

        const result = await transport.sendMail({
          to: identifier,
          from: 'no-reply@nanofy.com.br',
          subject: `Sign in to ${host}`,
          text: text({ url, host }),
          html: html({ url, host, theme }),
        })

        const failed = result.rejected.concat(result.pending).filter(Boolean)
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const accessToken = jwt.sign(
          { id: user.id },
          process.env.NEXTAUTH_SECRET as string,
          {
            expiresIn: 60 * 60 * 24 * 30,
          },
        )

        token.id = user.id
        token.accessToken = accessToken
      }

      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.accessToken = token.accessToken

      return session
    },
  },
}

function html(params: { url: string; host: string; theme: Theme }) {
  const { url, host, theme } = params

  const escapedHost = host.replace(/\./g, '&#8203;.')

  const brandColor = theme.brandColor || '#346df1'

  const color = {
    background: '#f9f9f9',
    text: '#444',
    mainBackground: '#fff',
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || '#fff',
  }

  return `
    <body style="background: ${color.background};">
      <table width="100%" border="0" cellspacing="20" cellpadding="0"
        style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
        <tr>
          <td align="center"
            style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
            Sign in to <strong>${escapedHost}</strong>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                    target="_blank"
                    style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                    in</a></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center"
            style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
            If you did not request this email you can safely ignore it.
          </td>
        </tr>
      </table>
    </body>
  `
}

function text({ url, host }: { url: string; host: string }) {
  return `Autenticar-se em ${host}\n${url}\n\n`
}
