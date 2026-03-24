import React, { useState } from "react";

function Planner() {
  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState([]);

  const addTopic = () => {
    const value = topic.trim();
    if (!value) {
      return;
    }

    setTopics((prev) => [...prev, value]);
    setTopic("");
  };

  const deleteTopic = (index) => {
    setTopics((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="card stack">
      <h2 className="page-title">Learning Planner</h2>
      <p className="page-subtitle">Add and manage your study topics.</p>

      <div className="grid-2">
        <input
          className="input"
          placeholder="Add a topic, e.g. Data Structures"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
        />
        <button className="btn btn-primary" onClick={addTopic}>
          Add Topic
        </button>
      </div>

      <article className="card" style={{ padding: "16px" }}>
        <h3 style={{ marginTop: 0 }}>Topics List</h3>
        {topics.length === 0 ? (
          <p style={{ margin: 0 }}>No topics added yet.</p>
        ) : (
          <ul style={{ paddingLeft: "20px", marginBottom: 0 }}>
            {topics.map((item, index) => (
              <li
                key={`${item}-${index}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                <span>{item}</span>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTopic(index)}
                  style={{ padding: "6px 10px" }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  );
}

export default Planner;
