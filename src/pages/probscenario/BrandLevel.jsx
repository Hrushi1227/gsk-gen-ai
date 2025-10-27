import { Checkbox, Select, Tabs } from "antd";
import PlotlyChart from "../../components/PlotlyChart";
import Sidebar from "../../components/Sidebar";

const { Option } = Select;
const { TabPane } = Tabs;

export default function BrandLevel() {
  // histogram-style data
  const varianceBins = Array.from({ length: 20 }, (_, i) => -20 + i * 2); // -20 to +20
  const varianceDensity = varianceBins.map(() =>
    Math.floor(30 + Math.random() * 20)
  );
  const gmmPdf = varianceBins.map(
    (x, i) => 25 + Math.sin(i / 2) * 10 + Math.random() * 5
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
      name: "gmm PDF",
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

  // simulated base LTDF distribution (right side)
  const simulatedBins = Array.from({ length: 25 }, (_, i) => 1 + i * 0.1); // 1.0M to 3.5M
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
        {/* Tabs on top */}
        <div className="mb-4">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Existing Indication" key="1" />
            <TabPane tab="New Indication" key="2" />
            <TabPane tab="Combined" key="3" />
          </Tabs>
        </div>

        {/* Orange sub-tabs */}
        <div className="flex gap-4 mb-6">
          <div className="badge bg-orange-100 text-gskOrange font-medium">
            Estimating the Variance
          </div>
          <div className="px-3 py-1 text-gray-700 bg-gray-100 rounded-full text-sm">
            Forecast Simulation
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">
          Estimating the Variance (%) Distribution for Simulations
        </h1>
        <p className="text-gray-600 mb-6">
          We follow a 2-step approach to generate probabilistic simulations of
          future states based on historical variance patterns:
        </p>

        <ol className="list-decimal ml-6 text-gray-700 mb-6">
          <li>
            We interpret the historical variance patterns using statistical
            distributions to uncover underlying behavior.
          </li>
          <li>
            We then simulate possible future Long Term Demand Forecast (LTDF)
            ranges based on these distributions.
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

        {/* Charts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="card-shadow rounded-2xl p-6">
            <div style={{ height: 480, position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <PlotlyChart
                  data={varianceChart}
                  layout={{
                    ...varianceLayout,
                    width: undefined,
                    height: undefined,
                  }}
                  config={{
                    responsive: true,
                    displayModeBar: false,
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Variance (%) Distribution
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Using the historical variance patterns, the right statistical
                distribution is estimated that most accurately describes the
                variance patterns. This estimated probability distribution is
                vital as it dictates the behavior of simulations of future
                states.
              </p>
            </div>
          </div>

          <div className="card-shadow rounded-2xl p-6">
            <div style={{ height: 480, position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <PlotlyChart
                  data={simulatedChart}
                  layout={{
                    ...simulatedLayout,
                    width: undefined,
                    height: undefined,
                  }}
                  config={{
                    responsive: true,
                    displayModeBar: false,
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Simulated Base LTDF Distribution
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                A distribution was fitted to the forecasted variance, which was
                then used to perform simulations. The simulated distribution of
                the Base LTDF (in units) is visualized here, allowing modeling
                of the expected range and variability for different years.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
