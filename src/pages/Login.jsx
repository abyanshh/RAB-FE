import LoginForm from '../features/AuthComponents/LoginForm'
import MainLayout from '../Layout/MainLayout'
const Login = () => {
  return (
    <div className="bg-cyan-50">
      <MainLayout>
          <LoginForm />
      </MainLayout>
    </div>
  )
}

export default Login