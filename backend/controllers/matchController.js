const Candidate = require("../models/Candidate");

const shortlistCandidates = async (req, res) => {
  try {
    const { requiredSkills, minExperience } = req.body;

    const candidates = await Candidate.find();

    const results = candidates.map(candidate => {
      const matchedSkills = candidate.skills.filter(skill =>
        requiredSkills.includes(skill)
      );

      const score =
        (matchedSkills.length / requiredSkills.length) * 100;

      return {
        name: candidate.name,
        skills: candidate.skills,
        experience: candidate.experience,
        matchedSkills,
        matchScore: score
      };
    });

    results.sort((a, b) => b.matchScore - a.matchScore);

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  shortlistCandidates
};