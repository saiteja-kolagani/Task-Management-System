const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getRepository } = require('typeorm');
const dotenv = require('dotenv');
const User = require('../entity/User');
const Role = require('../entity/Role');

dotenv.config();

class AuthService {
  async register({ username, password, role }) {
    const userRepository = getRepository(User);
    const roleRepository = getRepository(Role);

    const userRole = await roleRepository.findOne({ where: { name: role } });
    if (!userRole) {
      throw new Error('Role not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({ username, password: hashedPassword, role: userRole });
    await userRepository.save(user);

    return 'User registered successfully';
  }

  async login({ username, password }) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id, role: user.role.name }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return token;
  }
}

module.exports = AuthService;
