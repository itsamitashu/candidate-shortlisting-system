const Candidate = require("../models/Candidate");

const askOpenRouter = require("../services/openrouterService");

const aiShortlist = async (req, res) => {

  try {

    const { requiredSkills, minExperience } = req.body;

    const candidates = await Candidate.find();

    const prompt = `
Job requires:

Skills: ${requiredSkills.join(", ")}

Minimum Experience: ${minExperience}

Candidates:

${candidates.map(
(c) =>
`${c.name} - Skills: ${c.skills.join(", ")} - Experience: ${c.experience} years`
).join("\n")}

Rank candidates and explain why they are suitable.
`;

    const aiResponse = await askOpenRouter(prompt);

    res.json({
      success: true,
      response: aiResponse
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  aiShortlist
};