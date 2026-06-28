import { Link } from 'react-router-dom';
import { Home as HomeIcon, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="text-center max-w-md">
        <div className="relative mb-8">
          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl bg-primary/20 -z-10" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/"
          className="gradient-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="mt-12 flex justify-center">
          <HomeIcon className="w-16 h-16 text-gray-300 dark:text-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
