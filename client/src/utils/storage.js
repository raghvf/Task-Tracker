import { STORAGE_KEYS, DEFAULT_FILTERS } from './constants';

export const getStoredFilters = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FILTERS);
    if (stored) {
      return { ...DEFAULT_FILTERS, ...JSON.parse(stored) };
    }
  } catch {
    /* ignore parse errors */
  }
  return { ...DEFAULT_FILTERS };
};

export const saveFilters = (filters) => {
  try {
    const { page, ...persisted } = filters;
    localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(persisted));
  } catch {
    /* ignore storage errors */
  }
};

export const getStoredTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  } catch {
    return 'light';
  }
};

export const saveTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch {
    /* ignore storage errors */
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return 'No due date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const toInputDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};
