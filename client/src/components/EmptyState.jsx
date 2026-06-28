import { ClipboardList, Plus } from 'lucide-react';

const EmptyState = ({ onCreateTask, hasFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
          <ClipboardList className="w-12 h-12 text-primary" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary/20 animate-pulse" />
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {hasFilters ? 'No Tasks Found' : 'No Tasks Yet'}
      </h3>

      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
        {hasFilters
          ? 'Try adjusting your search or filters to find what you are looking for.'
          : 'Get started by creating your first task and stay organized.'}
      </p>

      {!hasFilters && (
        <button
          onClick={onCreateTask}
          className="gradient-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl"
        >
          <Plus className="w-5 h-5" />
          Create First Task
        </button>
      )}
    </div>
  );
};

export default EmptyState;
