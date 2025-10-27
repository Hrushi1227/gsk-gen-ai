import { Select } from "antd";
import PlotlyChart from "../components/PlotlyChart";
import Sidebar from "../components/Sidebar";
const { Option } = Select;

export default function ForecastSimulation() {
  const years = [
    2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
    2031,
  ];
  const base = [
    0.2, 0.8, 1.8, 2.6, 3.2, 4.0, 4.7, 5.2, 5.6, 6.0, 6.4, 6.8, 7.2,
  ].map((v) => v * 1e6);
  const up = base.map((v) => v * 1.25);
  const down = base.map((v) => v * 0.85);

  const data = [
    {
      x: years,
      y: base,
      mode: "lines",
      name: "Base LTDF",
      line: { color: "#0B3D91" },
    },
    {
      x: years,
      y: up,
      fill: "tonexty",
      name: "Upside LTDF",
      line: { color: "rgba(22,163,74,0.8)" },
      fillcolor: "rgba(34,197,94,0.15)",
    },
    {
      x: years,
      y: down,
      name: "Downside LTDF",
      line: { color: "rgba(220,38,38,0.9)" },
      fill: "tonexty",
      fillcolor: "rgba(254,202,202,0.3)",
    },
  ];
  const layout = {
    yaxis: { title: "LTDF Value (in Units)" },
    xaxis: { title: "Year" },
    legend: { orientation: "h", x: 0, y: 1.12 },
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto p-8">
          <h1 className="text-2xl font-bold mb-2">
            Probabilistic Scenario Analysis
          </h1>
          <p className="text-gray-600 mb-6">
            A probabilistic simulation visualizing upside and downside
            scenarios.
          </p>

          <div className="flex gap-4 mb-6">
            <Select defaultValue="Benlysta IV" style={{ width: 200 }}>
              <Option>Benlysta IV</Option>
            </Select>
            <Select defaultValue="US" style={{ width: 140 }}>
              <Option>US</Option>
            </Select>
            <Select defaultValue="Yearly" style={{ width: 140 }}>
              <Option>Yearly</Option>
            </Select>
            <Select defaultValue="2025" style={{ width: 140 }}>
              <Option>2025</Option>
            </Select>
          </div>

          <div className="card-shadow rounded-2xl p-4" style={{ height: 440 }}>
            <PlotlyChart data={data} layout={layout} />
          </div>

          <div className="mt-6 mb-6 bg-white p-6 rounded-2xl card-shadow">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-700">
                <tr>
                  <th className="p-2">Year</th>
                  <th className="p-2">Base LTDF</th>
                  <th className="p-2">Custom Forecast</th>
                </tr>
              </thead>
              <tbody>
                {[2025, 2026, 2027, 2028, 2029].map((y) => (
                  <tr key={y}>
                    <td className="p-2">{y}</td>
                    <td className="p-2">1,000,000</td>
                    <td className="p-2">1,050,000</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
