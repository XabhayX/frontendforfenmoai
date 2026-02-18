import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-gray-600 mb-6 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors duration-200"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
