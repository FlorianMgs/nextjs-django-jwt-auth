import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../actions/auth'
import Layout from '../hocs/Layout'
import { useRouter } from 'next/router'
import { Oval } from 'react-loader-spinner'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const register_success = useSelector((state) => state.auth.register_success)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const loading = useSelector((state) => state.auth.loading)
  const router = useRouter()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    re_password: '',
  })

  const { first_name, last_name, username, password, re_password } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(register(first_name, last_name, username, password, re_password))
    }
  }

  if (typeof window !== undefined && isAuthenticated) router.push('/dashboard')
  if (typeof window !== undefined && register_success) router.push('/login')

  return (
    <Layout
      title='httpOnly Auth | Register'
      content='Register'
      router={router}
    >
      <h1 className='display-4 mt-5'>Register Page</h1>
      <form
        className='bg-light p-5 mt-5 mb-5'
        onSubmit={(e) => onSubmit(e)}
      >
        <h3>Create an account</h3>
        <div className='form-group'>
          <label
            className='form-label mt-5'
            htmlFor='first_name'
          >
            <strong>First Name*</strong>
          </label>
          <input
            className='form-control'
            type='text'
            name='first_name'
            placeholder='First Name'
            value={first_name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <label
            className='form-label mt-2'
            htmlFor='last_name'
          >
            <strong>Last Name*</strong>
          </label>
          <input
            className='form-control'
            type='text'
            name='last_name'
            placeholder='Last Name'
            value={last_name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
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
        <div className='form-group'>
          <label
            className='form-label mt-2'
            htmlFor='re_password'
          >
            <strong>Confirm Password*</strong>
          </label>
          <input
            className='form-control'
            type='password'
            name='re_password'
            placeholder='Confirm Password'
            value={re_password}
            minLength={6}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        {loading ? (
          <div className='d-flex justify-content-center align-items-center mt-5'>
            <Oval
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
            Create Account
          </button>
        )}
      </form>
    </Layout>
  )
}

export default RegisterPage
