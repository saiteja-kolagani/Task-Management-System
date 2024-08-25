const { EntitySchema } = require('typeorm');

const Role = new EntitySchema({
  name: 'Role',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
      unique: true,
    },
  },
  relations: {
    users: {
      type: 'one-to-many',
      target: 'User',
      inverseSide: 'role',
    },
  },
});

module.exports = Role;
