import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Col, Row } from "react-bootstrap";

// Register necessary components from Chart.js, including the data labels plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const EarningsDashboard = ({
  earningsData,
  colors = ["#4caf50", "#ff9800", "#2196f3", "#e91e63", "#9c27b0", "#3f51b5"],
}) => {
  const [chartType, setChartType] = useState("Bar");
  const [darkMode, setDarkMode] = useState(false);

  // Prepare the data for the chart
  const data = Object.entries(earningsData || {}).map(
    ([key, value], index) => ({
      name: key,
      value: value || 0.0,
      color: colors[index % colors.length],
    })
  );

  // Chart Data
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Earnings ($)",
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
      },
    ],
  };

  // Chart Options with Conditional Configuration
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: "Earnings Overview",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `$${context.raw.toFixed(2)}`; // Format the tooltip to show two decimal places
          },
        },
      },
      // Enable data labels only for Pie chart
      datalabels: chartType === "Pie" && {
        color: "#fff", // White text for data labels on Pie chart
        font: {
          weight: "bold",
          size: 16,
        },
        formatter: (value) => `$${value.toFixed(2)}`, // Display formatted value on Pie slices
        align: "center", // Align label at the center of the slice
      },
    },
    scales:
      chartType === "Pie"
        ? {}
        : {
            // Hide scales for Pie chart
            x: {
              beginAtZero: true,
              ticks: {
                display: true,
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                display: true,
              },
            },
          },
    animation: {
      duration: 1500, // Animation duration in milliseconds
      easing: "easeOutQuad", // Animation easing function
    },
    elements: {
      bar: {
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: (context) => {
          const value = context.raw;
          return value > 0
            ? "rgba(75, 192, 192, 0.8)"
            : "rgba(255, 99, 132, 0.8)";
        },
      },
      line: {
        tension: 0.4, // Smooth curve
        borderColor: "#4caf50", // Line color
        borderWidth: 3,
        pointBackgroundColor: "#fff", // Point color
        pointBorderColor: "#4caf50", // Point border color
        pointRadius: 5, // Size of the points
        fill: true, // Fill under the line
      },
    },
  };

  // Change chart type based on the selection
  const renderChart = () => {
    switch (chartType) {
      case "Bar":
        return <Bar data={chartData} options={chartOptions} />;
      case "Pie":
        return <Pie data={chartData} options={chartOptions} />;
      case "Line":
        return <Line data={chartData} options={chartOptions} />;
      default:
        return <Bar data={chartData} options={chartOptions} />;
    }
  };

  return (
    <div
      className={`p-5 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Chart Type Selector */}
      <select
        value={chartType}
        onChange={(e) => setChartType(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="Bar">Bar Chart</option>
        <option value="Pie">Pie Chart</option>
        <option value="Line">Line Chart</option>
      </select>

      <Row>
        <Col
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          style={{
            height: "400px",
          }}
          className="align-items-center pt-5"
        >
          {renderChart()}
        </Col>
      </Row>
    </div>
  );
};

export default EarningsDashboard;
