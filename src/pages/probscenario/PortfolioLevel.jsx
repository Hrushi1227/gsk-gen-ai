import { Select, Tabs } from "antd";
import PlotlyChart from "../../components/PlotlyChart";
import Sidebar from "../../components/Sidebar";

const { Option } = Select;
const { TabPane } = Tabs;

export default function PortfolioLevel() {
  // Years (note screenshot shows 2026..2036-ish)
  const years = [
    2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036,
  ];

  // Sample data (units) — scaled to look like screenshot
  const baseLTDF = [
    2000, 15000, 45000, 85000, 90000, 120000, 110000, 105000, 120000, 150000,
    180000,
  ];
  const upsideLTDF = baseLTDF.map((v, i) =>
    Math.round(
      v * (1 + [0.05, 0.1, 0.25, 0.3, 0.35, 0.5, 0.45, 0.55, 0.6, 0.7, 0.8][i])
    )
  );
  const downsideLTDF = baseLTDF.map((v, i) =>
    Math.round(
      v *
        (1 -
          [0.02, 0.05, 0.05, 0.06, 0.08, 0.05, 0.06, 0.07, 0.06, 0.05, 0.1][i])
    )
  );

  const traceBase = {
    x: years,
    y: baseLTDF,
    mode: "lines+markers",
    name: "Base LTDF (from Commercial)",
    line: { color: "#0B63D9", width: 2 },
    marker: { size: 6 },
  };

  const traceUp = {
    x: years,
    y: upsideLTDF,
    mode: "lines+markers",
    name: "Upside LTDF (from commercial)",
    line: { color: "#16A34A", width: 2 },
    marker: { size: 6 },
  };

  const traceDown = {
    x: years,
    y: downsideLTDF,
    mode: "lines+markers",
    name: "Downside LTDF (from commercial)",
    line: { color: "#DC2626", width: 2 },
    marker: { size: 6 },
  };

  const data = [traceBase, traceUp, traceDown];

  const layout = {
    yaxis: { title: "LTDFs (in Units)", tickformat: ",", rangemode: "tozero" },
    xaxis: { title: "Year", tickmode: "array", tickvals: years },
    legend: { orientation: "h", x: 0, y: 1.12 },
    hovermode: "x unified",
    margin: { l: 60, r: 30, t: 20, b: 50 },
    // subtle background match with card
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)",
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top Tabs like "Indication Level Analysis / Forecast Simulation / Combined" */}
        <div className="mb-4">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Indication Level Analysis" key="1" />
            <TabPane tab="Forecast Simulation" key="2" />
            <TabPane tab="Combined" key="3" />
          </Tabs>
        </div>

        {/* Two small pills (New Indication / Existing Indication) */}
        <div className="flex gap-3 items-center mb-6">
          <div className="badge">New Indication</div>
          <div className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
            Existing Indication
          </div>
        </div>

        {/* Page Title + description */}
        <h1 className="text-2xl font-bold mb-2">
          New Product Launch Analysis on Indication
        </h1>
        <p className="text-gray-600 mb-6 max-w-4xl">
          This graph showcases three separate lines that represent the base,
          upside, and downside LTDF (Long Term Demand Forecast) values, measured
          in units, for each newly launched indication. The chart includes
          dropdowns to sub-brand & indication, with the POS (Probability of
          Success) displayed for each selected indication.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <div className="text-sm text-gray-600 mb-1">Sub-Brand</div>
            <Select defaultValue="All" style={{ width: 180 }}>
              <Option value="all">All</Option>
              <Option value="benlysta">Benlysta IV</Option>
              <Option value="other">Other</Option>
            </Select>
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-1">Indication</div>
            <Select defaultValue="Cobolimab 2L NSCLC" style={{ width: 420 }}>
              <Option value="cobo">
                Cobolimab 2L NSCLC (Combo Dosta+Cobo)
              </Option>
              <Option value="ind2">Indication 2</Option>
            </Select>
          </div>
        </div>

        {/* Chart card */}
        <div className="card-shadow rounded-2xl p-6 mb-6">
          <div style={{ height: 460 }}>
            <PlotlyChart data={data} layout={layout} />
          </div>
        </div>

        {/* optional insights / caption */}
        <div className="bg-white card-shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-2">
            Scenario Analysis summary
          </h3>
          <ul className="list-disc ml-6 text-gray-700">
            <li>
              POS for selected indication: <strong>0.42</strong> (example)
            </li>
            <li>
              Upside shows accelerated growth from 2031 onwards — indicates
              strong adoption in the target market.
            </li>
            <li>
              Downside path stays near baseline for first few years, diverging
              only after 2032 in stress scenarios.
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
