/* script.js */
document.getElementById("resumeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const jobDesc = document.getElementById("jobDescription").value.toLowerCase();
  const output = document.getElementById("output");
  const suggestions = document.getElementById("suggestions");

  if (!jobDesc) {
    output.innerHTML = "❌ Please paste the job description.";
    return;
  }

  // Dummy resume skills (assumed skills for easy running)
  const resumeSkills = [
    "html",
    "css",
    "javascript",
    "react",
    "git",
    "linux"
  ];

  // Skill list to check
  const allSkills = [
    "html", "css", "javascript", "react",
    "node", "python",  "sql",
    "git", "linux", "docker", "kubernetes"
  ];

  let requiredSkills = [];
  let matchedSkills = [];
  let missingSkills = [];

  // Extract required skills from job description
  allSkills.forEach(skill => {
    if (jobDesc.includes(skill)) {
      requiredSkills.push(skill);

      if (resumeSkills.includes(skill)) {
        matchedSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    }
  });

  const score = requiredSkills.length === 0
    ? 0
    : Math.round((matchedSkills.length / requiredSkills.length) * 100);

  // Display result
  output.innerHTML = `
    <h3>📊 Resume Analysis</h3>
    <p><b>Match Score:</b> ${score}%</p>

    <p><b>Required Skills:</b><br>
      ${requiredSkills.join(", ") || "None found in job description"}
    </p>

    <p><b>Matched Skills:</b><br>
      ${matchedSkills.join(", ") || "None"}
    </p>

    <p><b>Missing Skills:</b><br>
      ${missingSkills.join(", ") || "No missing skills 🎉"}
    </p>
  `;

  // Suggestions
  let tips = [];

  if (missingSkills.length > 0) {
    tips.push("Add the missing skills to your resume if you have experience.");
  }
  if (score < 50) {
    tips.push("Improve alignment by tailoring resume keywords.");
  }
  if (!jobDesc.includes("project")) {
    tips.push("Mention relevant projects.");
  }
  if (!jobDesc.includes("intern")) {
    tips.push("Include internships or hands-on experience.");
  }

  suggestions.innerHTML = `
    <h3>💡 Suggestions</h3>
    <ul>
      ${tips.map(t => `<li>${t}</li>`).join("") || "<li>Resume looks good 👍</li>"}
    </ul>
  `;
});
