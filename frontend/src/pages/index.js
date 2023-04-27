import Layout from '../hocs/Layout'

const homePage = () => {
  return (
    <Layout
      title='httpOnly auth | Home'
      content='Homepage'
    >
      <div className='p-5 bg-light rounded-3'>
        <div className='container-fluid py-3'>
          <h1 className='display-5 fw-bold'>Home Page</h1>
          <p className='fs-4 mt-3'>httpOnly auth tuto</p>
        </div>
      </div>
    </Layout>
  )
}

export default homePage
