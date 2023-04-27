import cookie from 'cookie'
import { IS_PROD_ENV } from '../../../config/index'

export default async (req, res) => {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', [
      cookie.serialize('access', '', {
        httpOnly: true,
        secure: IS_PROD_ENV,
        expires: new Date(0),
        sameSite: 'strict',
        path: '/api/',
      }),
      cookie.serialize('refresh', '', {
        httpOnly: true,
        secure: IS_PROD_ENV,
        expires: new Date(0),
        sameSite: 'strict',
        path: '/api/',
      }),
    ])

    return res.status(200).json({ success: 'Logged out successfully' })
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
