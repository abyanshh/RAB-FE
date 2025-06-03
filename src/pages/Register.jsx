import RegisterForm from '../features/AuthComponents/RegisterForm'
import MainLayout from '../Layout/MainLayout'

const Register = () => {
  return (
    <div className="bg-cyan-50 min-h-screen">
      <MainLayout>
        <RegisterForm/>
      </MainLayout>
    </div>
  )
}

export default Register