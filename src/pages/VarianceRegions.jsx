import { Select } from "antd";
import PlotlyChart from "../components/PlotlyChart";
import Sidebar from "../components/Sidebar";
const { Option } = Select;

export default function VarianceRegions() {
  const regions = ["China", "EU", "Japan", "ROW", "US"];
  const traces = [
    {
      name: "2019 Forecast",
      vals: [-800000, 100000, -20000, -150000, -700000],
      color: "#EC4899",
    },
    {
      name: "2020 Forecast",
      vals: [-500000, 200000, -50000, -120000, -400000],
      color: "#F59E0B",
    },
    {
      name: "2021 Forecast",
      vals: [700000, 50000, 80000, -50000, 800000],
      color: "#8B5E3C",
    },
    {
      name: "2022 Forecast",
      vals: [600000, 40000, 100000, 90000, 600000],
      color: "#06B6D4",
    },
    {
      name: "2023 Forecast",
      vals: [500000, 30000, 120000, 80000, 450000],
      color: "#3B82F6",
    },
    {
      name: "2024 Forecast",
      vals: [350000, 20000, 200000, 50000, 300000],
      color: "#A855F7",
    },
  ];

  const data = traces.map((t) => ({
    x: regions,
    y: t.vals,
    type: "bar",
    name: t.name,
    marker: { color: t.color },
  }));
  const layout = { barmode: "group", yaxis: { title: "Variance (in Units)" } };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-2">
          Variance Trend Across Regions
        </h1>
        <p className="text-gray-600 mb-6">
          Variance between Actual Sales and LTDF across regions.
        </p>

        <div className="flex gap-4 mb-6">
          <Select defaultValue="Benlysta IV" style={{ width: 200 }}>
            <Option>Benlysta IV</Option>
          </Select>
          <Select defaultValue="2024" style={{ width: 140 }}>
            <Option>2024</Option>
          </Select>
          <Select defaultValue="Units" style={{ width: 140 }}>
            <Option>Variance in Units</Option>
          </Select>
        </div>

        <div style={{ height: 420 }} className="card-shadow rounded-2xl p-4">
          <PlotlyChart data={data} layout={layout} />
        </div>

        <div className="mt-6 bg-white p-6 rounded-2xl card-shadow">
          <h3 className="font-semibold mb-2">
            Insights on Sub-brand Benlysta IV and Year 2024
          </h3>
          <ul className="list-disc ml-6 text-gray-700">
            <li>
              The China region shows a decreasing trend in variance from 2021 to
              2024.
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
