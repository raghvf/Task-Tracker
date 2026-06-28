import { CheckSquare } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <CheckSquare className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Task Tracker</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {year} Task Tracker. Built with MERN Stack.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
