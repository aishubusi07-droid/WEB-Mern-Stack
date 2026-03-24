import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const QUESTIONS = [
  {
    id: 1,
    text: "Which keyword declares a constant in JavaScript?",
    options: ["let", "var", "const", "static"],
    answer: "const",
  },
  {
    id: 2,
    text: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Transfer Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    id: 3,
    text: "Which method converts JSON text into an object?",
    options: ["JSON.toObject", "JSON.parse", "JSON.stringify", "JSON.convert"],
    answer: "JSON.parse",
  },
  {
    id: 4,
    text: "Which company develops React?",
    options: ["Google", "Microsoft", "Meta", "Amazon"],
    answer: "Meta",
  },
  {
    id: 5,
    text: "Which HTTP method is typically used to create data?",
    options: ["GET", "POST", "PUT", "DELETE"],
    answer: "POST",
  },
];

function SkillTest() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const answeredAll = useMemo(
    () => QUESTIONS.every((question) => answers[question.id]),
    [answers]
  );

  const onChange = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const calculateScore = () => {
    const points = QUESTIONS.reduce((acc, question) => {
      return answers[question.id] === question.answer ? acc + 1 : acc;
    }, 0);

    const result = `${points}/${QUESTIONS.length}`;
    setScore(result);

    localStorage.setItem("alpLastScore", result);

    const rawHistory = localStorage.getItem("alpScores");
    const scores = rawHistory ? JSON.parse(rawHistory) : [];
    scores.push(points);
    localStorage.setItem("alpScores", JSON.stringify(scores));
  };

  return (
    <section className="card stack">
      <h2 className="page-title">Skill Test</h2>
      <p className="page-subtitle">Answer all 5 questions and submit.</p>

      {QUESTIONS.map((question) => (
        <article key={question.id} className="card" style={{ padding: "16px" }}>
          <p style={{ marginTop: 0 }}>
            <strong>
              {question.id}. {question.text}
            </strong>
          </p>

          <div className="stack" style={{ gap: "8px" }}>
            {question.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  checked={answers[question.id] === option}
                  onChange={() => onChange(question.id, option)}
                />{" "}
                {option}
              </label>
            ))}
          </div>
        </article>
      ))}

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button
          className="btn btn-primary"
          onClick={calculateScore}
          disabled={!answeredAll}
        >
          Submit Test
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
      </div>

      {score && (
        <p style={{ margin: 0 }}>
          Your score: <strong>{score}</strong>
        </p>
      )}
    </section>
  );
}

export default SkillTest;
