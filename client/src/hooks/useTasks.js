import { useState, useEffect, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { taskAPI, showErrorToast } from '../services/api';
import { getStoredFilters, saveFilters } from '../utils/storage';
import { TASKS_PER_PAGE } from '../utils/constants';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export const useTasks = () => {
  const storedFilters = getStoredFilters();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    ...storedFilters,
    page: 1,
  });
  const [searchInput, setSearchInput] = useState(storedFilters.search);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: TASKS_PER_PAGE,
    total: 0,
    totalPages: 1,
  });
  const [statistics, setStatistics] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  const debouncedSearch = useDebounce(searchInput, 400);
  const fetchIdRef = useRef(0);

  const fetchTasks = useCallback(async (queryFilters) => {
    const fetchId = ++fetchIdRef.current;
    setLoading(true);

    try {
      const params = {
        search: queryFilters.search || undefined,
        status: queryFilters.status || undefined,
        priority: queryFilters.priority || undefined,
        sort: queryFilters.sort || 'newest',
        page: queryFilters.page || 1,
        limit: TASKS_PER_PAGE,
      };

      const { data } = await taskAPI.getAll(params);

      if (fetchId !== fetchIdRef.current) return;

      const { pagination: pag } = data;

      if (
        data.data.length === 0 &&
        pag.total > 0 &&
        pag.page > 1
      ) {
        setFilters((prev) => ({ ...prev, page: 1 }));
        return;
      }

      setTasks(data.data);
      setPagination(pag);
      setStatistics(data.statistics);
    } catch (error) {
      if (fetchId !== fetchIdRef.current) return;
      showErrorToast(error);
      setTasks([]);
    } finally {
      if (fetchId === fetchIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const queryFilters = { ...filters, search: debouncedSearch };
    saveFilters(queryFilters);
    fetchTasks(queryFilters);
  }, [
    debouncedSearch,
    filters.status,
    filters.priority,
    filters.sort,
    filters.page,
    fetchTasks,
  ]);

  useEffect(() => {
    setFilters((prev) => (prev.page === 1 ? prev : { ...prev, page: 1 }));
  }, [debouncedSearch]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key !== 'page' ? { page: 1 } : {}),
    }));
  };

  const setPage = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const getQueryFilters = () => ({
    ...filters,
    search: debouncedSearch,
  });

  const createTask = async (taskData) => {
    try {
      const { data } = await taskAPI.create(taskData);
      toast.success('Task Created Successfully');
      await fetchTasks(getQueryFilters());
      return data.data;
    } catch (error) {
      showErrorToast(error);
      throw error;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const { data } = await taskAPI.update(id, taskData);
      toast.success('Task Updated Successfully');
      await fetchTasks(getQueryFilters());
      return data.data;
    } catch (error) {
      showErrorToast(error);
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskAPI.delete(id);
      toast.success('Task Deleted Successfully');

      const queryFilters = getQueryFilters();
      if (tasks.length === 1 && filters.page > 1) {
        setFilters((prev) => ({ ...prev, page: prev.page - 1 }));
        return;
      }

      await fetchTasks(queryFilters);
    } catch (error) {
      showErrorToast(error);
      throw error;
    }
  };

  const refreshTasks = () => fetchTasks(getQueryFilters());

  const clearAllFilters = () => {
    const cleared = {
      search: '',
      status: '',
      priority: '',
      sort: 'newest',
      page: 1,
    };
    setSearchInput('');
    setFilters(cleared);
    saveFilters(cleared);
    fetchTasks(cleared);
  };

  return {
    tasks,
    loading,
    filters: { ...filters, search: debouncedSearch },
    searchInput,
    pagination,
    statistics,
    setSearchInput,
    updateFilter,
    setPage,
    createTask,
    updateTask,
    deleteTask,
    refreshTasks,
    clearAllFilters,
  };
};

export default useTasks;
