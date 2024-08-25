class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res) {
    try {
      const message = await this.authService.register(req.body);
      res.status(201).send(message);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async login(req, res) {
    try {
      const token = await this.authService.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

module.exports = AuthController;
