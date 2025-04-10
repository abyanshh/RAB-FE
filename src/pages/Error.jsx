import { useRouteError } from "react-router-dom"
import MainLayout from "../Layout/MainLayout";

const Error = () => {
  const error = useRouteError();
    console.error(error);
    return (
      <MainLayout>
        <div className="flex justify-center min-h-screen items-center flex-col">
            <h1 className="text-3xl font-bold mb-2">Oops!</h1>
            <div className="font-medium text-center text-slate-500">
                <p>Sorry, an unexpected error has occurred.</p>
                <i>{error.statusText || error.message}</i>
            </div>
        </div>
      </MainLayout>
    )
}

export default Error