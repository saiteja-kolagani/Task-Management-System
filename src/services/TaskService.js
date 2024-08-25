const { getRepository } = require('typeorm');
const Task = require('../entity/Task');

class TaskService {
  async createTask(taskDto) {
    const taskRepository = getRepository(Task);
    const task = taskRepository.create(taskDto);
    await taskRepository.save(task);
    return task;
  }

  async getTasks(filterDto) {
    const taskRepository = getRepository(Task);
    const queryBuilder = taskRepository.createQueryBuilder('task').leftJoinAndSelect('task.assignedUser', 'user');

    if (filterDto.priority) {
      queryBuilder.andWhere('task.priority = :priority', { priority: filterDto.priority });
    }

    if (filterDto.status) {
      queryBuilder.andWhere('task.status = :status', { status: filterDto.status });
    }

    if (filterDto.assignedUserId) {
      queryBuilder.andWhere('task.assignedUserId = :assignedUserId', { assignedUserId: filterDto.assignedUserId });
    }

    return await queryBuilder.getMany();
  }

  async updateTask(taskId, updateDto) {
    const taskRepository = getRepository(Task);
  
    if (!taskId) {
      throw new Error('Task ID is required');
    }
  
    let task = await taskRepository.findOne({ where: { id: taskId } });
  
    if (!task) {
      throw new Error('Task not found');
    }

    Object.assign(task, updateDto);
    return await taskRepository.save(task);
  }

  async deleteTask(taskId) {
    const taskRepository = getRepository(Task);
    
    let task = await taskRepository.findOne({ where: { id: taskId } });

    if (!task) {
      throw new Error('Task not found');
    }

    await taskRepository.remove(task);
  }
}

module.exports = TaskService;
