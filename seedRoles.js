const { getRepository } = require('typeorm');
const Role = require('./src/entity/Role');

const seedRoles = async () => {
  const roleRepository = getRepository(Role);

  const roles = ['Admin', 'Manager', 'Team Lead', 'Developer'];
  for (const roleName of roles) {
    const existingRole = await roleRepository.findOne({ where: { name: roleName } });
    if (!existingRole) {
      const role = roleRepository.create({ name: roleName });
      await roleRepository.save(role);
    }
  }
};

module.exports = seedRoles;
