import { Select, Tabs } from "antd";
import { useMemo, useState } from "react";
import PlotlyChart from "../../components/PlotlyChart";
import Sidebar from "../../components/Sidebar";

const { Option } = Select;
const { TabPane } = Tabs;

export default function PortfolioLevel() {
  // Tabs
  const [activeTab, setActiveTab] = useState("1");

  // State for filters
  const [subBrand, setSubBrand] = useState("benlysta");
  const [indication, setIndication] = useState("cobo");

  // Mock data mapping: subBrand -> list of indications
  const indicationMap = {
    all: [
      { value: "global_combo", label: "Global Combo Strategy" },
      { value: "global_nsclc", label: "NSCLC Pan-Region" },
    ],
    benlysta: [
      { value: "cobo", label: "Cobolimab 2L NSCLC (Combo Dosta+Cobo)" },
      { value: "sle", label: "Systemic Lupus Erythematosus (SLE)" },
      { value: "lupus", label: "Lupus Nephritis" },
    ],
    other: [
      { value: "vacc1", label: "Respiratory Vaccine Gen-2" },
      { value: "oncology", label: "Oncology Expansion (Solid Tumor)" },
      { value: "cardio", label: "Cardio Rare Disease 1L Therapy" },
    ],
  };

  // When SubBrand changes, auto-reset Indication to first item
  const handleSubBrandChange = (value) => {
    setSubBrand(value);
    const first = indicationMap[value][0]?.value || "";
    setIndication(first);
  };

  const handleIndicationChange = (value) => {
    setIndication(value);
  };

  // Generate mock LTDF data with randomness
  const years = useMemo(
    () => Array.from({ length: 11 }, (_, i) => 2026 + i),
    []
  );

  const randomFactor = useMemo(
    () => Math.random() * 0.5 + 0.75,
    [subBrand, indication]
  );
  const baseLTDF = useMemo(
    () =>
      years.map((_, i) =>
        Math.round(2000 + Math.random() * 1000 + i * 15000 * randomFactor)
      ),
    [subBrand, indication]
  );

  const upsideLTDF = baseLTDF.map((v, i) =>
    Math.round(v * (1.15 + Math.random() * 0.3))
  );
  const downsideLTDF = baseLTDF.map((v, i) =>
    Math.round(v * (0.85 - Math.random() * 0.1))
  );

  // Plotly traces
  const traceBase = {
    x: years,
    y: baseLTDF,
    mode: "lines+markers",
    name: "Base LTDF (Commercial)",
    line: { color: "#0B63D9", width: 2 },
    marker: { size: 6 },
  };

  const traceUp = {
    x: years,
    y: upsideLTDF,
    mode: "lines+markers",
    name: "Upside LTDF (Optimistic)",
    line: { color: "#16A34A", width: 2 },
    marker: { size: 6 },
  };

  const traceDown = {
    x: years,
    y: downsideLTDF,
    mode: "lines+markers",
    name: "Downside LTDF (Pessimistic)",
    line: { color: "#DC2626", width: 2 },
    marker: { size: 6 },
  };

  const data = [traceBase, traceUp, traceDown];

  const layout = {
    yaxis: { title: "LTDF (in Units)", tickformat: ",", rangemode: "tozero" },
    xaxis: { title: "Year", tickmode: "array", tickvals: years },
    legend: { orientation: "h", x: 0, y: 1.12 },
    hovermode: "x unified",
    margin: { l: 60, r: 30, t: 20, b: 50 },
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)",
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Tabs */}
        <div className="mb-4">
          <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
            <TabPane tab="Indication Level Analysis" key="1" />
            <TabPane tab="Forecast Simulation" key="2" />
            <TabPane tab="Combined" key="3" />
          </Tabs>
        </div>

        {/* Pills */}
        <div className="flex gap-3 items-center mb-6">
          <div className="badge">New Indication</div>
          <div className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
            Existing Indication
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">
          New Product Launch Analysis on Indication
        </h1>
        <p className="text-gray-600 mb-6 max-w-4xl">
          This graph dynamically updates LTDF forecasts based on sub-brand and
          indication selections. Each combination generates unique mock data to
          simulate realistic analysis scenarios.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <div className="text-sm text-gray-600 mb-1">Sub-Brand</div>
            <Select
              value={subBrand}
              onChange={handleSubBrandChange}
              style={{ width: 200 }}
            >
              <Option value="all">All</Option>
              <Option value="benlysta">Benlysta IV</Option>
              <Option value="other">Other</Option>
            </Select>
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-1">Indication</div>
            <Select
              value={indication}
              onChange={handleIndicationChange}
              style={{ width: 400 }}
            >
              {indicationMap[subBrand].map((ind) => (
                <Option key={ind.value} value={ind.value}>
                  {ind.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Chart */}
        <div className="card-shadow rounded-2xl p-6 mb-6">
          <div style={{ height: 480 }}>
            <PlotlyChart
              data={data}
              layout={layout}
              config={{ responsive: true, displayModeBar: false }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white card-shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-2">
            Scenario Analysis Summary
          </h3>
          <ul className="list-disc ml-6 text-gray-700">
            <li>
              Selected Sub-Brand:{" "}
              <strong>
                {subBrand.charAt(0).toUpperCase() + subBrand.slice(1)}
              </strong>
            </li>
            <li>
              Indication:{" "}
              <strong>
                {
                  indicationMap[subBrand].find((i) => i.value === indication)
                    ?.label
                }
              </strong>
            </li>
            <li>
              POS (mock):{" "}
              <strong>{(0.3 + Math.random() * 0.5).toFixed(2)}</strong>
            </li>
            <li>
              Upside scenario projects faster growth beyond 2030, suggesting
              strong market readiness.
            </li>
            <li>
              Downside remains stable in early years, diverging only under
              conservative assumptions post-2033.
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
