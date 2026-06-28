import { Router } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import validate from '../middleware/validate.js';
import {
  createTaskValidation,
  updateTaskValidation,
  taskIdValidation,
} from '../validators/taskValidator.js';

const router = Router();

router.get('/', getTasks);
router.get('/:id', taskIdValidation, validate, getTaskById);
router.post('/', createTaskValidation, validate, createTask);
router.put('/:id', updateTaskValidation, validate, updateTask);
router.delete('/:id', taskIdValidation, validate, deleteTask);

export default router;
