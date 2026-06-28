export const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed'];

export const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'priority', label: 'Priority' },
  { value: 'dueDate', label: 'Due Date' },
];

export const STATUS_COLORS = {
  Pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  Completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
};

export const PRIORITY_COLORS = {
  Low: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  Medium: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  High: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

export const DEFAULT_FILTERS = {
  search: '',
  status: '',
  priority: '',
  sort: 'newest',
  page: 1,
};

export const TASKS_PER_PAGE = 9;

export const STORAGE_KEYS = {
  THEME: 'tasktracker-theme',
  FILTERS: 'tasktracker-filters',
};
