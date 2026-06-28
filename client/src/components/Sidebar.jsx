import {
  LayoutDashboard,
  ListTodo,
  Clock,
  CheckCircle2,
  CircleDot,
  X,
} from 'lucide-react';
const Sidebar = ({ isOpen, onClose, statistics, filters, onFilterChange, onShowAllTasks }) => {
  const navItems = [
    {
      label: 'All Tasks',
      icon: ListTodo,
      status: '',
      count: statistics.total,
      color: 'text-primary',
    },
    {
      label: 'Pending',
      icon: CircleDot,
      status: 'Pending',
      count: statistics.pending,
      color: 'text-amber-500',
    },
    {
      label: 'In Progress',
      icon: Clock,
      status: 'In Progress',
      count: statistics.inProgress,
      color: 'text-blue-500',
    },
    {
      label: 'Completed',
      icon: CheckCircle2,
      status: 'Completed',
      count: statistics.completed,
      color: 'text-emerald-500',
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 glass border-r border-gray-200/50 dark:border-gray-700/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-16 lg:pt-0">
          <div className="flex items-center justify-between p-4 lg:hidden border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-primary" />
              <span className="font-semibold">Navigation</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 p-6 border-b border-gray-200 dark:border-gray-700">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            <span className="font-semibold text-gray-800 dark:text-gray-200">Dashboard</span>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = filters.status === item.status;

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.status === '') {
                      onShowAllTasks();
                    } else {
                      onFilterChange('status', item.status);
                    }
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary dark:bg-primary/20'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : item.color}`} />
                    {item.label}
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {item.count}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Keyboard: <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">N</kbd> New task
              {' · '}
              <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">K</kbd> Search
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
