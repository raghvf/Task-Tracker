import { useState, useRef, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StatsCards from '../components/StatsCards';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import DeleteModal from '../components/DeleteModal';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import useTasks from '../hooks/useTasks';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const {
    tasks,
    loading,
    filters,
    searchInput,
    pagination,
    statistics,
    setSearchInput,
    updateFilter,
    setPage,
    createTask,
    updateTask,
    deleteTask,
    clearAllFilters,
  } = useTasks();

  const { toggleTheme } = useTheme();
  const searchRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openCreateModal = useCallback(() => {
    setSelectedTask(null);
    setTaskModalOpen(true);
  }, []);

  const openEditModal = (task) => {
    setSelectedTask(task);
    setTaskModalOpen(true);
  };

  const openDeleteModal = (task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const closeTaskModal = () => {
    setTaskModalOpen(false);
    setSelectedTask(null);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedTask) {
        await updateTask(selectedTask._id, formData);
      } else {
        await createTask(formData);
      }
      closeTaskModal();
    } catch {
      /* error handled in hook */
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!taskToDelete) return;
    setIsDeleting(true);
    try {
      await deleteTask(taskToDelete._id);
      closeDeleteModal();
    } catch {
      /* error handled in hook */
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInputFocused =
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT';

      if (e.key === 'n' && !e.ctrlKey && !e.metaKey && !isInputFocused && !taskModalOpen) {
        e.preventDefault();
        openCreateModal();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }

      if (e.key === 'd' && !e.ctrlKey && !e.metaKey && !isInputFocused) {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [taskModalOpen, openCreateModal, toggleTheme]);

  const hasActiveFilters =
    filters.search || filters.status || filters.priority;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar
        onMenuToggle={() => setSidebarOpen((prev) => !prev)}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          statistics={statistics}
          filters={filters}
          onFilterChange={updateFilter}
          onShowAllTasks={clearAllFilters}
        />

        <main className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <StatsCards statistics={statistics} />

            <div className="mt-8 space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <SearchBar
                  ref={searchRef}
                  value={searchInput}
                  onChange={setSearchInput}
                />
                <button
                  onClick={openCreateModal}
                  className="gradient-btn inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl shrink-0"
                >
                  <Plus className="w-5 h-5" />
                  Add Task
                </button>
              </div>

              <FilterBar filters={filters} onFilterChange={updateFilter} />
            </div>

            <div className="mt-8">
              {loading ? (
                <LoadingSpinner />
              ) : tasks.length === 0 ? (
                <EmptyState
                  onCreateTask={openCreateModal}
                  hasFilters={hasActiveFilters}
                />
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {tasks.map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={openEditModal}
                        onDelete={openDeleteModal}
                      />
                    ))}
                  </div>

                  <Pagination pagination={pagination} onPageChange={setPage} />
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />

      <TaskModal
        isOpen={taskModalOpen}
        onClose={closeTaskModal}
        task={selectedTask}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        task={taskToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default Home;
