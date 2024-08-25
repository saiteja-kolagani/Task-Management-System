const { EntitySchema } = require('typeorm');

const Task = new EntitySchema({
  name: 'Task',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    title: {
      type: 'varchar',
    },
    description: {
      type: 'text',
    },
    status: {
      type: 'varchar',
    },
    priority: {
      type: 'varchar',
    },
    assignedUserId: {
      type: 'int',
    },
  },
  relations: {
    assignedUser: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: {
        name: 'assignedUserId',
      },
    },
  },
});

module.exports = Task;
