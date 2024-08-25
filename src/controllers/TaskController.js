class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  async createTask(req, res) {
    try {
      const task = await this.taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', error });
    }
  }

  async getTasks(req, res) {
    try {
      // Pass query parameters as filterDto
      const filterDto = req.query;
      const tasks = await this.taskService.getTasks(filterDto);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving tasks', error });
    }
  }

  async updateTask(req, res) {
    try {
      const taskId = req.params.id;
      console.log('Task ID received:', taskId);
  
      if (!taskId) {
        return res.status(400).json({ message: 'Task ID is required' });
      }
  
      const task = await this.taskService.updateTask(taskId, req.body);
      res.status(200).json(task);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Error updating task', error: error.message });
    }
  }
  
  

  async deleteTask(req, res) {
    try {
      await this.taskService.deleteTask(req.params.id);
      res.status(200).send('Task deleted successfully');
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error });
    }
  }
}

module.exports = TaskController;
