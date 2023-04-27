import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { logout } from '@/actions/auth'

const Navbar = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const logoutHandler = () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(logout())
    }
  }

  const authLinks = (
    <>
      <div className='navbar-nav'>
        <Link
          className={
            router.pathname === '/dashboard' ? 'nav-link active' : 'nav-link'
          }
          href='/dashboard'
        >
          Dashboard
        </Link>
      </div>
      <div className='navbar-nav'>
        <a
          className='nav-link'
          href='#'
          onClick={logoutHandler}
        >
          Logout
        </a>
      </div>
    </>
  )

  const guestLinks = (
    <>
      <div className='navbar-nav'>
        <Link
          className={
            router.pathname === '/register' ? 'nav-link active' : 'nav-link'
          }
          href='/register'
        >
          Register
        </Link>
      </div>
      <div className='navbar-nav'>
        <Link
          className={
            router.pathname === '/login' ? 'nav-link active' : 'nav-link'
          }
          href='/login'
        >
          Login
        </Link>
      </div>
    </>
  )

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <Link
          className='navbar-brand'
          href='/'
        >
          Navbar
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse'
          id='navbarNavAltMarkup'
        >
          <div className='navbar-nav'>
            <Link
              className={
                router.pathname === '/' ? 'nav-link active' : 'nav-link'
              }
              href='/'
            >
              Home
            </Link>
          </div>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  )
}
export default Navbar
