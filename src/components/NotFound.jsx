import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <h1 className="text-6xl font-extrabold text-indigo-600 mb-4 animate-bounce">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Page Not Found</h2>
      <p className="text-slate-500 mb-8 text-center max-w-md">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>

      <Link
        to="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-medium"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
