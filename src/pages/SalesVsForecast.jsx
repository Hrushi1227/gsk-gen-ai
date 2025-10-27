// src/pages/SalesVsForecast.jsx
import { Select } from "antd";
import PlotlyChart from "../components/PlotlyChart";
import Sidebar from "../components/Sidebar";

const { Option } = Select;

export default function SalesVsForecast() {
  const years = Array.from({ length: 13 }, (_, i) => 2019 + i); // 2019..2031

  // sample data (numbers in units)
  const actual = [
    3800000, 4500000, 6200000, 6000000, 6100000, 8000000, 6200000, 6800000,
    7600000, 9000000, 9600000, 9900000, 10200000,
  ];
  const f2019 = [
    1000000, 1500000, 2000000, 2500000, 3200000, 4200000, 4700000, 5200000,
    5600000, 6000000, 6400000, 6800000, 7000000,
  ];
  const f2020 = f2019.map((v) => v * 1.1);
  const f2021 = f2019.map((v) => v * 1.2);
  const f2022 = f2019.map((v) => v * 1.3);
  const f2023 = f2019.map((v) => v * 1.4);

  const data = [
    {
      x: years,
      y: actual,
      mode: "lines+markers",
      name: "Actual Sales",
      line: { color: "#062241", width: 3 },
      marker: { size: 6 },
    },
    {
      x: years,
      y: f2019,
      mode: "lines",
      name: "2019 Forecast",
      line: { dash: "dash", color: "#EC4899" },
    },
    {
      x: years,
      y: f2020,
      mode: "lines",
      name: "2020 Forecast",
      line: { dash: "dash", color: "#F59E0B" },
    },
    {
      x: years,
      y: f2021,
      mode: "lines",
      name: "2021 Forecast",
      line: { dash: "dash", color: "#8B5E3C" },
    },
    {
      x: years,
      y: f2022,
      mode: "lines",
      name: "2022 Forecast",
      line: { dash: "dash", color: "#06B6D4" },
    },
    {
      x: years,
      y: f2023,
      mode: "lines",
      name: "2023 Forecast",
      line: { dash: "dash", color: "#3B82F6" },
    },
  ];

  const layout = {
    yaxis: { title: "Value (in Units)", tickformat: ",.0f" },
    xaxis: { title: "Year" },
    legend: { orientation: "h", x: 0, y: 1.12 },
    margin: { l: 60, r: 30, t: 20, b: 50 },
    hovermode: "x unified",
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-2">
          Actual Sales vs. Long Term Demand Forecast (LTDF)
        </h1>
        <p className="text-gray-600 mb-6">
          This chart shows how actual sales (in Units) compare to snapshot LTDF
          forecasts.
        </p>

        <div className="flex gap-4 mb-6">
          <Select defaultValue="Benlysta IV" style={{ width: 220 }}>
            <Option>Benlysta IV</Option>
            <Option>Benlysta SC</Option>
          </Select>
          <Select defaultValue="Global" style={{ width: 160 }}>
            <Option>Global</Option>
            <Option>US</Option>
            <Option>EU</Option>
          </Select>
          <Select defaultValue="Yearly" style={{ width: 160 }}>
            <Option>Yearly</Option>
            <Option>Quarterly</Option>
            <Option>Monthly</Option>
          </Select>
        </div>

        <div className="card-shadow rounded-2xl p-4" style={{ height: 440 }}>
          <PlotlyChart data={data} layout={layout} />
        </div>

        {/* Insights card */}
        <div className="mt-6 bg-white card-shadow rounded-2xl p-6">
          <div className="inline-flex gap-2 mb-3">
            <span className="px-3 py-1 bg-orange-50 text-gskOrange rounded-full text-sm">
              Benlysta IV in Global Region
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Insights</h3>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Sample insight A about forecast accuracy.</li>
            <li>Sample insight B about year-on-year adjustment.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
