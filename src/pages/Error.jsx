import { useRouteError } from "react-router-dom";
import Button from "../components/Button";

const Error = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center text-center px-4">
      <img 
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjhsM2lwMzc1NGIxamVqZ3Fhc2xrbzJla20xczRuYW5sZW9zMmhnYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aVfPgosI7ksiBBsTtZ/giphy.gif" 
        alt="Error gif" 
        className="w-64 h-64 object-contain mb-6 rounded-full"
      />

      <h1 className="text-3xl font-bold text-cyan-700 mb-2">Oops!</h1>
      <p className="text-lg text-slate-600 mb-4">Sorry, an unexpected error has occurred.</p>
      <p className="text-sm text-slate-500 italic mb-2">
        {error?.statusText || error?.message}
      </p>

      <Button
        as='link'
        to="/" 
        variant="blue"
      >
      Kembali
      </Button>
    </div>
  );
};

export default Error;

