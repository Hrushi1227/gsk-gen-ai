import { Select } from "antd";
import PlotlyChart from "../../components/PlotlyChart";
import Sidebar from "../../components/Sidebar";
const { Option } = Select;

export default function YoYVariance() {
  const years = [2019, 2020, 2021, 2022, 2023, 2024];
  const f2019 = [-200000, 100000, 500000, 600000, 700000, 1100000];
  const f2020 = [-300000, 1200000, 600000, 500000, 650000, 900000];
  const f2021 = [-100000, 200000, -100000, -50000, 400000, 600000];
  const f2022 = [0, 250000, 300000, 150000, 120000, -100000];
  const f2023 = [-150000, 200000, 180000, 120000, -200000, 300000];
  const f2024 = [100000, 400000, 800000, 900000, 850000, 1200000];

  const data = [
    {
      x: years,
      y: f2019,
      mode: "lines+markers",
      name: "2019 Forecast Variance",
      line: { color: "#EC4899" },
    },
    {
      x: years,
      y: f2020,
      mode: "lines+markers",
      name: "2020 Forecast Variance",
      line: { color: "#F59E0B" },
    },
    {
      x: years,
      y: f2021,
      mode: "lines+markers",
      name: "2021 Forecast Variance",
      line: { color: "#8B5E3C" },
    },
    {
      x: years,
      y: f2022,
      mode: "lines+markers",
      name: "2022 Forecast Variance",
      line: { color: "#06B6D4" },
    },
    {
      x: years,
      y: f2023,
      mode: "lines+markers",
      name: "2023 Forecast Variance",
      line: { color: "#3B82F6" },
    },
    {
      x: years,
      y: f2024,
      mode: "lines+markers",
      name: "2024 Forecast Variance",
      line: { color: "#A855F7" },
    },
  ];

  const layout = {
    yaxis: { title: "Variance (in Units)" },
    xaxis: { title: "Year" },
    legend: { orientation: "h", x: 0, y: 1.15 },
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto p-8">
          <h1 className="text-2xl font-bold mb-2">
            Year on Year Variance Trend (in Units)
          </h1>
          <p className="text-gray-600 mb-6">
            This chart shows the variance between Actual Sales and LTDF for each
            year, starting from 2019.
          </p>

          <div className="flex gap-4 mb-6">
            <Select defaultValue="Benlysta IV" style={{ width: 200 }}>
              <Option>Benlysta IV</Option>
            </Select>
            <Select defaultValue="Global" style={{ width: 140 }}>
              <Option>Global</Option>
            </Select>
            <Select defaultValue="Yearly" style={{ width: 140 }}>
              <Option>Yearly</Option>
            </Select>
          </div>

          <div className="card-shadow rounded-2xl p-4" style={{ height: 440 }}>
            <PlotlyChart data={data} layout={layout} />
          </div>

          <div className="mt-6 mb-6 bg-white p-6 rounded-2xl card-shadow">
            <h3 className="font-semibold mb-2">
              Insights on Benlysta IV in Global Region
            </h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                The Variance % range for underestimation in 2019 was -8.3% to
                -48.1%
              </li>
              <li>… (other insights as in your screenshots)</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
