import cookie from 'cookie'
import { API_URL } from '../../../config/index'

export default async (req, res) => {
  if (req.method === 'GET') {
    const cookies = cookie.parse(req.headers.cookie || '')
    const access = cookies.access || false
    if (access === false) {
      return res.status(403).json({ error: 'Forbidden' })
    }
    const body = JSON.stringify({
      token: access,
    })
    try {
      const apiRes = await fetch(`${API_URL}/api/token/verify/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      })

      if (apiRes.status === 200) {
        return res.status(200).json({ success: 'Authenticated successfully' })
      } else {
        return res
          .status(apiRes.status)
          .json({ error: 'Failed to authenticate' })
      }
    } catch {
      return res
        .status(500)
        .json({ error: 'Something went wrong while authenticating' })
    }
  } else {
    req.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: `Method ${req.method} not allowed` })
  }
}
