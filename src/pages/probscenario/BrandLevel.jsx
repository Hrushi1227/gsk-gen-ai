import { Checkbox, Select, Tabs } from "antd";
import { useState } from "react";
import ForecastSimulation from "../../components/ForecastSimulation";
import PlotlyChart from "../../components/PlotlyChart";
import Sidebar from "../../components/layout/Sidebar";

const { Option } = Select;
const { TabPane } = Tabs;

export default function BrandLevel() {
  // 🔸 Parent Tabs
  const [activeParentTab, setActiveParentTab] = useState("existing");

  // 🔸 Inner Tabs inside "Existing Indication"
  const [activeInnerTab, setActiveInnerTab] = useState("variance");

  // Histogram data (mocked)
  const varianceBins = Array.from({ length: 20 }, (_, i) => -20 + i * 2);
  const varianceDensity = varianceBins.map(() =>
    Math.floor(30 + Math.random() * 20)
  );
  const gmmPdf = varianceBins.map(
    (_, i) => 25 + Math.sin(i / 2) * 10 + Math.random() * 5
  );

  const varianceChart = [
    {
      x: varianceBins.map((v) => `${v}%`),
      y: varianceDensity,
      type: "bar",
      name: "Histogram",
      marker: { color: "#B6E31D", opacity: 0.9 },
    },
    {
      x: varianceBins.map((v) => `${v}%`),
      y: gmmPdf,
      mode: "lines",
      name: "GMM PDF",
      line: { color: "#C2410C", width: 3 },
      yaxis: "y",
    },
  ];

  const varianceLayout = {
    title: {
      text: "Variance (%) Distribution for Benlysta IV in US",
      font: { size: 14 },
      x: 0,
    },
    yaxis: { title: "Density", showgrid: false },
    xaxis: { title: "Forecasted Variance (%)" },
    barmode: "overlay",
    legend: { orientation: "h", x: 0, y: 1.15 },
    margin: { l: 60, r: 30, t: 40, b: 50 },
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)",
  };

  // Simulated LTDF distribution (right chart)
  const simulatedBins = Array.from({ length: 25 }, (_, i) => 1 + i * 0.1);
  const simulatedFreq = simulatedBins.map((_, i) =>
    Math.max(0, 40 - Math.abs(i - 12) * 3 + Math.random() * 5)
  );

  const simulatedChart = [
    {
      x: simulatedBins.map((v) => `${v.toFixed(1)}M`),
      y: simulatedFreq,
      type: "bar",
      name: "Simulated Base LTDF (in Units)",
      marker: { color: "#60A5FA", opacity: 0.9 },
    },
    {
      x: ["1.8M", "2.1M", "2.5M"],
      y: [50, 45, 40],
      mode: "lines",
      name: "Confidence Intervals",
      line: { dash: "dash", color: "#000" },
      showlegend: false,
    },
  ];

  const simulatedLayout = {
    title: {
      text: "Simulated Base LTDF Distribution (in Units) for Benlysta IV in US",
      font: { size: 14 },
      x: 0,
    },
    yaxis: { title: "Frequency" },
    xaxis: { title: "Simulated Base LTDF (in Units)" },
    legend: { orientation: "h", x: 0, y: 1.15 },
    margin: { l: 60, r: 30, t: 40, b: 50 },
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)",
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* 🔹 Parent Tabs */}
        <div className="mb-6">
          <div className="flex justify-center gap-6 border-b pb-2">
            {["existing", "new", "combined"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveParentTab(tab)}
                className={`pb-2 text-base font-medium transition ${
                  activeParentTab === tab
                    ? "text-gskOrange border-b-2 border-gskOrange"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab === "existing"
                  ? "Existing Indication"
                  : tab === "new"
                  ? "New Indication"
                  : "Combined"}
              </button>
            ))}
          </div>
        </div>

        {/* ✅ Existing Indication content */}
        {activeParentTab === "existing" && (
          <>
            {/* Inner orange tabs */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveInnerTab("variance")}
                className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                  activeInnerTab === "variance"
                    ? "bg-orange-50 text-gskOrange border border-orange-200"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Estimating the Variance
              </button>
              <button
                onClick={() => setActiveInnerTab("forecast")}
                className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                  activeInnerTab === "forecast"
                    ? "bg-orange-50 text-gskOrange border border-orange-200"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Forecast Simulation
              </button>
            </div>

            {/* Inner tab 1: Variance */}
            {activeInnerTab === "variance" && (
              <>
                <h1 className="text-2xl font-bold mb-4">
                  Estimating the Variance (%) Distribution for Simulations
                </h1>
                <p className="text-gray-600 mb-6">
                  We follow a 2-step approach to generate probabilistic
                  simulations of future states based on historical variance
                  patterns:
                </p>

                <ol className="list-decimal ml-6 text-gray-700 mb-6">
                  <li>
                    Interpret historical variance patterns using statistical
                    distributions.
                  </li>
                  <li>
                    Simulate possible future LTDF ranges based on these
                    distributions.
                  </li>
                </ol>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <Select defaultValue="Benlysta IV" style={{ width: 200 }}>
                    <Option>Benlysta IV</Option>
                    <Option>Benlysta SC</Option>
                  </Select>
                  <Select defaultValue="US" style={{ width: 140 }}>
                    <Option>US</Option>
                    <Option>Global</Option>
                  </Select>
                  <Select defaultValue="2025" style={{ width: 140 }}>
                    <Option>2024</Option>
                    <Option>2025</Option>
                    <Option>2026</Option>
                  </Select>
                  <Select defaultValue="Yearly" style={{ width: 140 }}>
                    <Option>Yearly</Option>
                    <Option>Quarterly</Option>
                  </Select>
                  <Checkbox>Remove Outliers</Checkbox>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="card-shadow rounded-2xl p-6">
                    <div style={{ height: 480 }}>
                      <PlotlyChart
                        data={varianceChart}
                        layout={varianceLayout}
                        config={{ responsive: true, displayModeBar: false }}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        Variance (%) Distribution
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Using historical variance patterns, a distribution is
                        fitted to describe the underlying behavior.
                      </p>
                    </div>
                  </div>

                  <div className="card-shadow rounded-2xl p-6">
                    <div style={{ height: 480 }}>
                      <PlotlyChart
                        data={simulatedChart}
                        layout={simulatedLayout}
                        config={{ responsive: true, displayModeBar: false }}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        Simulated Base LTDF Distribution
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        This distribution enables simulation of possible future
                        LTDF ranges under different assumptions.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Inner tab 2: Forecast Simulation */}
            {activeInnerTab === "forecast" && <ForecastSimulation />}
          </>
        )}

        {/* 🟠 Placeholder for New Indication */}
        {activeParentTab === "new" && (
          <div className="card-shadow rounded-2xl p-10 text-center text-gray-500">
            <h3 className="text-xl font-semibold text-gskOrange mb-2">
              New Indication
            </h3>
            <p>
              Content for this section will be added later. For now, this is a
              placeholder.
            </p>
          </div>
        )}

        {/* 🟢 Placeholder for Combined */}
        {activeParentTab === "combined" && (
          <div className="card-shadow rounded-2xl p-10 text-center text-gray-500">
            <h3 className="text-xl font-semibold text-gskOrange mb-2">
              Combined Analysis
            </h3>
            <p>
              This section will display merged insights across all indications
              in the next version.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
