import { Col, InputNumber, Row, Select, Tabs } from "antd";
import { useMemo, useState } from "react";
import PlotlyChart from "../components/PlotlyChart";
import Sidebar from "../components/Sidebar";

const { Option } = Select;
const { TabPane } = Tabs; // Ant still exposes Tabs.TabPane pattern

export default function BrandLevelForecastSimulation() {
  // top-level tabs
  const [topTab, setTopTab] = useState("new"); // "existing" | "new" | "combined"

  // inner pill tabs (subtabs)
  const [subTab, setSubTab] = useState("estimating"); // "estimating" | "forecast"

  // Filters state
  const [subBrand, setSubBrand] = useState("Benlysta SC");
  const [region, setRegion] = useState("China");
  const [forecastYear, setForecastYear] = useState(2030);
  const [customPct, setCustomPct] = useState(0);

  // years for the plot
  const years = [2029, 2030, 2031, 2032, 2033, 2034, 2035];

  // Mock series (replace with real API data)
  const base = [20000, 2500000, 2000000, 2400000, 3000000, 3300000, 3800000];
  const median = [30000, 3000000, 2300000, 2700000, 3500000, 3800000, 4000000];
  const upside = median.map((v, i) =>
    Math.round(v * [1.1, 1.2, 1.25, 1.45, 1.3, 1.2, 1.25][i])
  );
  const downside = median.map((v, i) =>
    Math.round(v * [0.95, 0.85, 0.9, 0.8, 0.85, 0.82, 0.9][i])
  );
  const custom = base.map((v) => Math.round(v * (1 + customPct / 100)));
  const lower50 = median.map((v, i) =>
    Math.round(v * [0.85, 0.8, 0.82, 0.7, 0.78, 0.8, 0.85][i])
  );
  const upper50 = median.map((v, i) =>
    Math.round(v * [1.15, 1.25, 1.25, 1.4, 1.2, 1.25, 1.3][i])
  );

  // Plot traces
  const plotData = useMemo(() => {
    const bandLower = {
      x: years,
      y: lower50,
      type: "scatter",
      mode: "lines",
      line: { width: 0 },
      hoverinfo: "skip",
      showlegend: false,
      name: "Lower 25%",
    };
    const bandUpper = {
      x: years,
      y: upper50,
      type: "scatter",
      mode: "lines",
      fill: "tonexty",
      fillcolor: "rgba(56,165,255,0.12)",
      line: { width: 0 },
      hoverinfo: "skip",
      showlegend: true,
      name: "50% of LTDF Simulations lie within this range",
    };

    const medianTrace = {
      x: years,
      y: median,
      mode: "lines",
      name: "Simulated Median LTDF",
      line: { color: "#D97706", width: 2.5 },
    };
    const baseTrace = {
      x: years,
      y: base,
      mode: "lines",
      name: "Base LTDF (from Commercial)",
      line: { color: "#0B63D9", width: 2.5 },
    };
    const customTrace = {
      x: years,
      y: custom,
      mode: "lines",
      name: "Custom LTDF",
      line: { color: "#111827", dash: "dot", width: 2.5 },
    };
    const upsideTrace = {
      x: years,
      y: upside,
      mode: "lines",
      name: "Upside LTDF (from commercial)",
      line: { color: "#16A34A", dash: "dash", width: 2.5 },
    };
    const downsideTrace = {
      x: years,
      y: downside,
      mode: "lines",
      name: "Downside LTDF (from commercial)",
      line: { color: "#DC2626", dash: "dash", width: 2.5 },
    };

    return [
      bandLower,
      bandUpper,
      medianTrace,
      baseTrace,
      customTrace,
      upsideTrace,
      downsideTrace,
    ];
  }, [years, median, base, custom, upside, downside, lower50, upper50]);

  const plotLayout = useMemo(
    () => ({
      yaxis: { title: "Value (in Units)", tickformat: ",.0f", zeroline: false },
      xaxis: { title: "Year", tickvals: years },
      legend: { orientation: "h", x: 0, y: 1.12, font: { size: 11 } },
      margin: { l: 70, r: 30, t: 30, b: 50 },
      hovermode: "x unified",
      plot_bgcolor: "rgba(0,0,0,0)",
      paper_bgcolor: "rgba(0,0,0,0)",
    }),
    [years]
  );

  // Handler for top Tabs
  const handleTopTabChange = (key) => {
    // key values we choose: "existing", "new", "combined"
    setTopTab(key);
    // reset subTab when switching top-level tab if desired:
    setSubTab("estimating");
  };

  // Render: top-level Tabs control actual visible section
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top-level Tabs (clickable) */}
        <div className="mb-4">
          <Tabs activeKey={topTab} onChange={handleTopTabChange}>
            <TabPane tab="Existing Indication" key="existing" />
            <TabPane tab="New Indication" key="new" />
            <TabPane tab="Combined" key="combined" />
          </Tabs>
        </div>

        {/* Only render the "New Indication" content when topTab === "new" */}
        {topTab === "new" && (
          <>
            {/* Sub-tabs (pills) — clickable */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setSubTab("estimating")}
                className={`px-3 py-1 rounded-full text-sm ${
                  subTab === "estimating"
                    ? "bg-orange-50 text-gskOrange font-medium"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Estimating the Variance
              </button>

              <button
                onClick={() => setSubTab("forecast")}
                className={`px-3 py-1 rounded-full text-sm ${
                  subTab === "forecast"
                    ? "bg-orange-50 text-gskOrange font-medium"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Forecast Simulation
              </button>
            </div>

            {/* Page title + description */}
            <h1 className="text-2xl font-bold mb-2">
              Forecast Simulation on Brand using PoS
            </h1>
            <p className="text-gray-600 mb-6 max-w-3xl">
              By incorporating the probability of success (PoS) for each
              indication, we generate multiple scenarios to simulate real-world
              possibilities.
            </p>

            {/* Filters — common to both subtabs */}
            <div className="card-shadow rounded-2xl p-6 mb-6">
              <Row gutter={16} className="items-center">
                <Col xs={24} md={6}>
                  <div className="text-sm text-gray-600 mb-2">Sub-Brand</div>
                  <Select
                    value={subBrand}
                    onChange={setSubBrand}
                    style={{ width: "100%" }}
                  >
                    <Option value="Benlysta SC">Benlysta SC</Option>
                    <Option value="Benlysta IV">Benlysta IV</Option>
                  </Select>
                </Col>

                <Col xs={24} md={6}>
                  <div className="text-sm text-gray-600 mb-2">Region</div>
                  <Select
                    value={region}
                    onChange={setRegion}
                    style={{ width: "100%" }}
                  >
                    <Option value="China">China</Option>
                    <Option value="US">US</Option>
                    <Option value="Global">Global</Option>
                  </Select>
                </Col>

                <Col xs={24} md={6}>
                  <div className="text-sm text-gray-600 mb-2">
                    Custom Forecast Year
                  </div>
                  <Select
                    value={forecastYear}
                    onChange={(v) => setForecastYear(Number(v))}
                    style={{ width: "100%" }}
                  >
                    <Option value={2029}>2029</Option>
                    <Option value={2030}>2030</Option>
                    <Option value={2031}>2031</Option>
                    <Option value={2032}>2032</Option>
                    <Option value={2033}>2033</Option>
                    <Option value={2034}>2034</Option>
                    <Option value={2035}>2035</Option>
                  </Select>
                </Col>

                <Col xs={24} md={6}>
                  <div className="text-sm text-gray-600 mb-2">
                    Custom Forecast (% of Median)
                  </div>
                  <div className="flex items-center gap-2">
                    <InputNumber
                      value={customPct}
                      onChange={(v) => setCustomPct(Number(v) || 0)}
                      formatter={(value) => `${value}%`}
                      parser={(value) => String(value).replace("%", "")}
                      min={-100}
                      max={500}
                      style={{ width: "120px" }}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            {/* Now render different inner content depending on subTab */}
            {subTab === "estimating" && (
              <div className="card-shadow rounded-2xl p-6 mb-6">
                {/* Estimating the Variance content: histogram + explanations — placeholder here */}
                <h3 className="text-lg font-semibold mb-2">
                  Estimating the Variance (preview)
                </h3>
                <p className="text-gray-600 mb-4">
                  This section would show the variance histogram and GMM PDF as
                  in your Brand Level design.
                </p>
                {/* You can reuse the histogram Plotly code here */}
              </div>
            )}

            {subTab === "forecast" && (
              <>
                {/* Forecast simulation chart */}
                <div className="card-shadow rounded-2xl p-6 mb-6">
                  <div style={{ height: 420 }}>
                    <PlotlyChart data={plotData} layout={plotLayout} />
                  </div>
                </div>

                {/* Summary table */}
                <div className="card-shadow rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    PoS Adjusted Total Demand (in Units) Summary
                  </h3>
                  <div className="overflow-auto">
                    <table className="min-w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2 text-left">Sub Brand</th>
                          <th className="p-2 text-left">Region</th>
                          <th className="p-2 text-left">Case</th>
                          {years.map((y) => (
                            <th key={y} className="p-2 text-right">
                              {y}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2">Benlysta SC</td>
                          <td className="p-2">China</td>
                          <td className="p-2">Base</td>
                          {base.map((v, i) => (
                            <td key={i} className="p-2 text-right">
                              {v.toLocaleString()}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-2">Benlysta SC</td>
                          <td className="p-2">China</td>
                          <td className="p-2">Custom</td>
                          {custom.map((v, i) => (
                            <td key={i} className="p-2 text-right">
                              {v.toLocaleString()}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* Example: content for other top tabs */}
        {topTab === "existing" && (
          <div className="card-shadow rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Existing Indication</h3>
            <p className="text-gray-600">Content for existing indications...</p>
          </div>
        )}
        {topTab === "combined" && (
          <div className="card-shadow rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Combined</h3>
            <p className="text-gray-600">Combined content...</p>
          </div>
        )}
      </main>
    </div>
  );
}
