import Task from '../models/Task.js';
import asyncHandler from '../utils/asyncHandler.js';

const priorityOrder = { High: 1, Medium: 2, Low: 3 };

const buildSortOption = (sort) => {
  switch (sort) {
    case 'oldest':
      return { createdAt: 1 };
    case 'priority':
      return null;
    case 'dueDate':
      return { dueDate: 1, createdAt: -1 };
    case 'newest':
    default:
      return { createdAt: -1 };
  }
};

export const getTasks = asyncHandler(async (req, res) => {
  const {
    search = '',
    status = '',
    priority = '',
    sort = 'newest',
    page = 1,
    limit = 9,
  } = req.query;

  const filter = {};

  if (search.trim()) {
    filter.$or = [
      { title: { $regex: search.trim(), $options: 'i' } },
      { description: { $regex: search.trim(), $options: 'i' } },
    ];
  }

  if (status) {
    filter.status = status;
  }

  if (priority) {
    filter.priority = priority;
  }

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 9));
  const skip = (pageNum - 1) * limitNum;

  let tasks;
  let total;

  if (sort === 'priority') {
    const allTasks = await Task.find(filter);
    allTasks.sort((a, b) => {
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    total = allTasks.length;
    tasks = allTasks.slice(skip, skip + limitNum);
  } else {
    const sortOption = buildSortOption(sort);
    total = await Task.countDocuments(filter);
    tasks = await Task.find(filter).sort(sortOption).skip(skip).limit(limitNum);
  }

  const stats = await Task.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        pending: {
          $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] },
        },
        inProgress: {
          $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] },
        },
        completed: {
          $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] },
        },
      },
    },
  ]);

  const statistics = stats[0] || {
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  };

  res.status(200).json({
    success: true,
    data: tasks,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
    },
    statistics: {
      total: statistics.total,
      pending: statistics.pending,
      inProgress: statistics.inProgress,
      completed: statistics.completed,
    },
  });
});

export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  const task = await Task.create({
    title,
    description: description || '',
    status,
    priority,
    dueDate: dueDate || null,
  });

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: task,
  });
});

export const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (dueDate !== undefined) {
    task.dueDate = dueDate === null || dueDate === '' ? null : dueDate;
  }

  const updatedTask = await task.save();

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: updatedTask,
  });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
    data: { id: req.params.id },
  });
});
