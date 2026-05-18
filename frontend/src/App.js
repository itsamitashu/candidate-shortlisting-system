import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [candidates, setCandidates] = useState([]);
  const [matches, setMatches] = useState([]);
  const [aiResult, setAiResult] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    projects: ""
  });

  const API = "https://candidate-shortlisting-frontend-yle1.onrender.com";

  const fetchCandidates = async () => {

    const res = await axios.get(
      `${API}/api/candidates`
    );

    setCandidates(res.data);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addCandidate = async () => {

    await axios.post(
      `${API}/api/candidates`,
      {
        ...formData,
        skills: formData.skills.split(","),
        experience: Number(formData.experience)
      }
    );

    fetchCandidates();

    alert("Candidate Added Successfully");
  };

  const matchCandidates = async () => {

    const res = await axios.post(
      `${API}/api/match`,
      {
        requiredSkills: ["React", "Node.js"],
        minExperience: 1
      }
    );

    setMatches(res.data);
  };

  const aiShortlist = async () => {

    const res = await axios.post(
      `${API}/api/ai/shortlist`,
      {
        requiredSkills: ["React", "Node.js"],
        minExperience: 2
      }
    );

    setAiResult(res.data.response);
  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-center text-blue-700 mb-10">
          AI Candidate Shortlisting System
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">

          <h2 className="text-2xl font-semibold mb-4">
            Add Candidate
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border p-3 rounded-xl"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-3 rounded-xl"
              onChange={handleChange}
            />

            <input
              type="text"
              name="skills"
              placeholder="Skills"
              className="border p-3 rounded-xl"
              onChange={handleChange}
            />

            <input
              type="number"
              name="experience"
              placeholder="Experience"
              className="border p-3 rounded-xl"
              onChange={handleChange}
            />

          </div>

          <textarea
            name="projects"
            placeholder="Projects"
            className="border p-3 rounded-xl w-full mt-4"
            onChange={handleChange}
          />

          <button
            onClick={addCandidate}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-4 hover:bg-blue-700"
          >
            Add Candidate
          </button>

        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">

          <div className="flex flex-wrap gap-4 mb-6">

            <button
              onClick={matchCandidates}
              className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
            >
              Match Candidates
            </button>

            <button
              onClick={aiShortlist}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700"
            >
              AI Rank Candidates
            </button>

          </div>

          <h2 className="text-2xl font-semibold mb-4">
            Candidates
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {
              candidates.map((c) => (

                <div
                  key={c._id}
                  className="bg-gray-100 p-4 rounded-2xl shadow"
                >
                  <h3 className="text-xl font-bold text-blue-700">
                    {c.name}
                  </h3>

                  <p>{c.email}</p>

                  <p>
                    Skills: {c.skills.join(", ")}
                  </p>

                  <p>
                    Experience: {c.experience} years
                  </p>
                </div>
              ))
            }

          </div>

        </div>

        <div classNamite="bg-white rounded-2xl shadow-xl p-6 mb-8">

          <h2 className="text-2xl font-semibold mb-4">
            Match Results
          </h2>

          {
            matches.map((m, index) => (

              <div
                key={index}
                className="border rounded-xl p-4 mb-3"
              >
                <h3 className="text-lg font-bold">
                  {m.name}
                </h3>

                <p>
                  Match Score: {m.matchScore}%
                </p>

                <p>
                  Skills: {m.matchedSkills.join(", ")}
                </p>

              </div>
            ))
          }

        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">

          <h2 className="text-2xl font-semibold mb-4">
            AI Recommendation
          </h2>

          <pre className="whitespace-pre-wrap text-gray-700">
            {aiResult}
          </pre>

        </div>

      </div>

    </div>
  );
}

export default App;