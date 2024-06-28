import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
})

export const config = {
  matcher: ['/quadros'],
}
