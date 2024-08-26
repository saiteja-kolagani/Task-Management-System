require('reflect-metadata');
const express = require('express');
const { createConnection } = require('typeorm');
const dotenv = require('dotenv');
const seedRoles = require('./seedRoles');
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

dotenv.config();

const app = express();
app.use(express.json());

createConnection().then(async () => {
  console.log('Database connected');

  await seedRoles();

  app.use('/api/auth', authRoutes);
  app.use('/api', taskRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => console.log(error));

