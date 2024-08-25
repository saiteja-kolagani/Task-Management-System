const express = require('express');
const AuthService = require('../services/AuthService');
const AuthController = require('../controllers/AuthController');
const { registrationValidationRules, loginValidationRules, validateRequest } = require('../middlewares/validationMiddleware');

const authService = new AuthService();
const authController = new AuthController(authService);
const router = express.Router();

router.post('/register', registrationValidationRules, validateRequest, (req, res) => authController.register(req, res));
router.post('/login', loginValidationRules, validateRequest, (req, res) => authController.login(req, res));

module.exports = router;
