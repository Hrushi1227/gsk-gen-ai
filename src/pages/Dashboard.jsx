import { Select } from "antd";
import PlotlyChart from "../components/PlotlyChart";
import Sidebar from "../components/Sidebar";
const { Option } = Select;

export default function Dashboard() {
  // sample data: multi-line forecast + actual
  const years = Array.from({ length: 13 }, (_, i) => 2019 + i); // 2019..2031

  const actual = [
    3.8, 4.5, 6.2, 6.0, 6.1, 8.0, 5.2, 6.3, 7.5, 8.8, 9.6, 9.9, 10.1,
  ].map((v) => v * 1e6);
  const forecast2019 = [
    1, 1.2, 1.5, 2, 2.7, 3, 3.4, 3.9, 4.3, 5, 5.5, 5.8, 6,
  ].map((v) => v * 1e6);
  const forecast2020 = [
    1.5, 2.4, 3.1, 3.8, 4.4, 4.8, 5.1, 5.6, 6.1, 6.6, 7.1, 7.6, 8,
  ].map((v) => v * 1e6);
  const forecast2021 = [
    2, 2.8, 3.7, 4.1, 4.6, 5.0, 5.3, 5.8, 6.3, 6.8, 7.2, 7.6, 8,
  ].map((v) => v * 1e6);
  const forecast2022 = [
    2.2, 3, 3.9, 4.6, 5.2, 5.8, 6.3, 6.7, 7.2, 7.7, 8.1, 8.6, 9,
  ].map((v) => v * 1e6);
  const forecast2023 = [
    2.4, 3.3, 4.3, 5.0, 5.6, 6.1, 6.8, 7.2, 7.8, 8.4, 8.9, 9.3, 9.7,
  ].map((v) => v * 1e6);

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
      y: forecast2019,
      mode: "lines",
      name: "2019 Forecast",
      line: { dash: "dash", color: "#EC4899" },
    },
    {
      x: years,
      y: forecast2020,
      mode: "lines",
      name: "2020 Forecast",
      line: { dash: "dash", color: "#F59E0B" },
    },
    {
      x: years,
      y: forecast2021,
      mode: "lines",
      name: "2021 Forecast",
      line: { dash: "dash", color: "#8B5E3C" },
    },
    {
      x: years,
      y: forecast2022,
      mode: "lines",
      name: "2022 Forecast",
      line: { dash: "dash", color: "#06B6D4" },
    },
    {
      x: years,
      y: forecast2023,
      mode: "lines",
      name: "2023 Forecast",
      line: { dash: "dash", color: "#3B82F6" },
    },
  ];

  const layout = {
    yaxis: { title: "Value (in Units)", tickformat: ",.0f" },
    xaxis: { title: "Year" },
    legend: { orientation: "h", x: 0, y: 1.15 },
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-2">
          Actual Sales vs. Long Term Demand Forecast (LTDF)
        </h1>
        <p className="text-gray-600 mb-6 max-w-3xl">
          This chart shows how actual sales (in Units) compare to base LTDF made
          in different years. This can give insights into forecast accuracy.
        </p>

        <div className="flex gap-4 mb-6">
          <Select defaultValue="Benlysta IV" style={{ width: 200 }}>
            <Option>Benlysta IV</Option>
            <Option>Benlysta SC</Option>
          </Select>
          <Select defaultValue="Global" style={{ width: 140 }}>
            <Option>Global</Option>
            <Option>US</Option>
            <Option>EU</Option>
          </Select>
          <Select defaultValue="Yearly" style={{ width: 140 }}>
            <Option>Yearly</Option>
            <Option>Quarterly</Option>
          </Select>
        </div>

        <div className="card-shadow p-4 rounded-2xl">
          <div style={{ height: 420 }}>
            <PlotlyChart data={data} layout={layout} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-3 bg-white p-6 rounded-2xl card-shadow">
            <div className="mb-4 inline-flex gap-2">
              <span className="px-3 py-1 bg-orange-50 text-gskOrange rounded-full text-sm">
                Benlysta IV in Global Region
              </span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                Benlysta IV across all Regions
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Insights on Benlysta IV in Global Region
            </h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                For the latest LRF Snapshot Year 2024, the Forecasted LRFs for
                the years 2024 to 2034 show a consistent increase.
              </li>
              <li>
                Comparing across snapshot years, the Forecasted LRFs have
                generally increased each year, with notable jumps observed in
                2021 and 2022.
              </li>
              <li>
                Underestimation was prevalent in 2019 and 2020, shifting to
                overestimation in 2021 and 2022.
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
