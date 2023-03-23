class apiController {
  async ping(req, res) {
    try {
      res.json({
        answer: 'Pong',
      });
    } catch (e) {
      console.log(`[ERR] ${e.message}`);
    }
  }
}

module.exports = new apiController();
