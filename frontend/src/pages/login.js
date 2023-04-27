import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset_register_success } from '../actions/auth'
import Layout from '../hocs/Layout'
import { useRouter } from 'next/router'
import { Oval } from 'react-loader-spinner'

const LoginPage = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const loading = useSelector((state) => state.auth.loading)
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const { username, password } = formData

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(reset_register_success())
    }
  }, [dispatch])

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(login(username, password))
    }
  }
  if (typeof window !== undefined && isAuthenticated) router.push('/dashboard')
  return (
    <Layout
      title='httpOnly Auth | Login'
      content='Login'
      router={router}
    >
      <h1 className='display-4 mt-5'>Login Page</h1>
      <form
        className='bg-light p-5 mt-5 mb-5'
        onSubmit={(e) => onSubmit(e)}
      >
        <h3>Login to your account</h3>
        <div className='form-group'>
          <label
            className='form-label mt-2'
            htmlFor='username'
          >
            <strong>Username*</strong>
          </label>
          <input
            className='form-control'
            type='text'
            name='username'
            placeholder='Username'
            value={username}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <label
            className='form-label mt-2'
            htmlFor='password'
          >
            <strong>Password*</strong>
          </label>
          <input
            className='form-control'
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            minLength={6}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        {loading ? (
          <div className='d-flex justify-content-center align-items-center mt-5'>
            <Oval
              type='Oval'
              color='#00bfff'
              width={50}
              height={50}
            />
          </div>
        ) : (
          <button
            className='btn btn-primary mt-5'
            type='submit'
            onClick={(e) => onSubmit(e)}
          >
            Login
          </button>
        )}
      </form>
    </Layout>
  )
}

export default LoginPage
