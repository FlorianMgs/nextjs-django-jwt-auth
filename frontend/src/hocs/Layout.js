import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { request_refresh } from '../actions/auth'
import Head from 'next/head'
import Navbar from '@/components/Navbar'

const Layout = ({ title, content, children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(request_refresh())
  }, [dispatch])

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
