import React from "react";

function Home() {
  return (
    <section className="card stack">
      <h2 className="page-title">Welcome to Analyzer Learner Planner</h2>
      <p className="page-subtitle">
        Analyze your skill level, plan your learning, and track progress over
        time from one place.
      </p>
      <div className="grid-2">
        <article className="card" style={{ padding: "18px" }}>
          <h3>Analyze</h3>
          <p>Take a short skill test and get a score instantly.</p>
        </article>
        <article className="card" style={{ padding: "18px" }}>
          <h3>Plan</h3>
          <p>Create and manage your learning topics clearly.</p>
        </article>
      </div>
    </section>
  );
}

export default Home;
