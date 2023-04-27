import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { request_refresh } from '../actions/auth'
import Head from 'next/head'
import Navbar from '@/components/Navbar'

const Layout = ({ title, content, children }) => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(request_refresh())
    }
  }, [isAuthenticated])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name='description'
          content={content}
        ></meta>
      </Head>
      <div className='container'>
        <Navbar />
        {children}
      </div>
    </>
  )
}

Layout.defaultProps = {
  title: 'httpOnly auth Django NextJS tuto',
  content: 'content',
}

export default Layout
