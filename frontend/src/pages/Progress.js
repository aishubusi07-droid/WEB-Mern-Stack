import React from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Progress() {
  const rawScores = localStorage.getItem("alpScores");
  const scores = rawScores ? JSON.parse(rawScores) : [];

  const chartData = {
    labels: scores.map((_, index) => `Test ${index + 1}`),
    datasets: [
      {
        label: "Skill Test Score",
        data: scores,
        borderColor: "#1d4ed8",
        backgroundColor: "rgba(29, 78, 216, 0.25)",
        borderWidth: 2,
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Progress Over Time" },
    },
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <section className="card stack">
      <h2 className="page-title">Progress Tracker</h2>
      <p className="page-subtitle">Your skill test history visualized with Chart.js.</p>

      <article className="card" style={{ padding: "16px" }}>
        {scores.length === 0 ? (
          <p style={{ margin: 0 }}>No scores yet. Take a skill test first.</p>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </article>
    </section>
  );
}

export default Progress;
