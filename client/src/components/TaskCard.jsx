import { Pencil, Trash2, Calendar, Clock } from 'lucide-react';
import { STATUS_COLORS, PRIORITY_COLORS } from '../utils/constants';
import { formatDate, formatDateTime } from '../utils/storage';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const isOverdue =
    task.dueDate &&
    task.status !== 'Completed' &&
    new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));

  return (
    <div className="glass rounded-2xl p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
          {task.title}
        </h3>
        <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/10 transition-colors"
            aria-label="Edit task"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="p-2 rounded-lg text-gray-500 hover:text-danger hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-1">
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${PRIORITY_COLORS[task.priority]}`}
        >
          {task.priority}
        </span>
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${STATUS_COLORS[task.status]}`}
        >
          {task.status}
        </span>
      </div>

      <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 space-y-1.5">
        <div
          className={`flex items-center gap-2 text-xs ${
            isOverdue ? 'text-danger font-medium' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Due: {formatDate(task.dueDate)}</span>
          {isOverdue && <span className="text-danger">(Overdue)</span>}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
          <Clock className="w-3.5 h-3.5" />
          <span>Created: {formatDateTime(task.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
