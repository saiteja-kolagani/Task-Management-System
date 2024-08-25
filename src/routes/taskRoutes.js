const express = require('express');
const TaskService = require('../services/TaskService');
const TaskController = require('../controllers/TaskController');
const authMiddleware = require('../middlewares/authMiddleware');
const { taskCreationValidationRules, validateRequest } = require('../middlewares/validationMiddleware');

const taskService = new TaskService();
const taskController = new TaskController(taskService);
const router = express.Router();

router.post('/tasks', authMiddleware(['Admin', 'Manager']), taskCreationValidationRules, validateRequest, (req, res) => taskController.createTask(req, res));
router.get('/tasks', authMiddleware(['Admin', 'Manager', 'Team Lead', 'Developer']), (req, res) => taskController.getTasks(req, res));
router.put('/tasks/:id', authMiddleware(['Admin', 'Manager']), taskCreationValidationRules, validateRequest, (req, res) => taskController.updateTask(req, res));
router.delete('/tasks/:id', authMiddleware(['Admin', 'Manager']), (req, res) => taskController.deleteTask(req, res));

module.exports = router;
