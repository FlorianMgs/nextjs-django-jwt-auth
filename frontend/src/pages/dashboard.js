import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Layout from '../hocs/Layout'
import { useEffect } from 'react'

const Dashboard = () => {
  const router = useRouter()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)
  const loading = useSelector((state) => state.auth.loading)

  useEffect(() => {
    if (typeof window !== undefined && !loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated])

  return (
    <Layout
      title='httpOnly Auth | Dashboard'
      content='Dashboard'
    >
      <div className='p-5 bg-light rounded-3'>
        <div className='container-fluid py-3'>
          <h1 className='display-5 fw-bold'>Dashboard Page</h1>
        </div>
        <p className='fs-4 mt-3'>Welcome {user !== null && user.first_name}</p>
      </div>
    </Layout>
  )
}

export default Dashboard
