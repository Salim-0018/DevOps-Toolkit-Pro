const aiService = require("../../services/ai/aiService");

exports.askAI = async (req, res) => {
  const { message } = req.body;

  const result = await aiService.solveError(message);

  res.json(result);
};

exports.streamAI = async (req, res) => {
  const { message } = req.body;

  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Transfer-Encoding", "chunked");

  await aiService.streamAnswer(message, res);

  res.end();
};
