import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useCrypto } from "../../context/cryprto-context";
import { useState } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
  const { assets, crypto } = useCrypto();

  const data = {
    labels: assets.map((c) => c.name),
    datasets: [
      {
        label: "$",
        data: assets.map((c) => c.totalAmount),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "1rem",
        height: 400,
        justifyContent: "center",
      }}
    >
      <Pie data={data} />
    </div>
  );
}
