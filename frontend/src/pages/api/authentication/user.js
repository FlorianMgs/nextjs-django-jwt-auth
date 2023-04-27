import cookie from 'cookie'
import { API_URL } from '@/config/index'

export default async (req, res) => {
  if (req.method === 'GET') {
    const cookies = cookie.parse(req.headers.cookie ?? '')
    const access = cookies.access ?? false

    if (!access) {
      return res.status(401).json({ message: 'User not authorized' })
    }

    try {
      const apiRes = await fetch(`${API_URL}/api/authentication/user/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${access}`,
        },
      })
      const data = await apiRes.json()
      if (apiRes.status === 200) {
        return res.status(200).json({ user: data.user })
      } else {
        return res.status(apiRes.status).json({ error: data.error })
      }
    } catch (err) {
      return res.status(500).json({ error: 'Something went wrong' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
