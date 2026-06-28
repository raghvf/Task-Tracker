import { body, param } from 'express-validator';

const statusValues = ['Pending', 'In Progress', 'Completed'];
const priorityValues = ['Low', 'Medium', 'High'];

export const createTaskValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(statusValues)
    .withMessage(`Status must be one of: ${statusValues.join(', ')}`),
  body('priority')
    .optional()
    .isIn(priorityValues)
    .withMessage(`Priority must be one of: ${priorityValues.join(', ')}`),
  body('dueDate')
    .optional({ values: 'falsy' })
    .isISO8601()
    .withMessage('Due date must be a valid date'),
];

export const updateTaskValidation = [
  param('id').isMongoId().withMessage('Invalid task ID'),
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(statusValues)
    .withMessage(`Status must be one of: ${statusValues.join(', ')}`),
  body('priority')
    .optional()
    .isIn(priorityValues)
    .withMessage(`Priority must be one of: ${priorityValues.join(', ')}`),
  body('dueDate')
    .optional({ nullable: true })
    .custom((value) => {
      if (value === null || value === '') return true;
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error('Due date must be a valid date');
      }
      return true;
    }),
];

export const taskIdValidation = [
  param('id').isMongoId().withMessage('Invalid task ID'),
];
