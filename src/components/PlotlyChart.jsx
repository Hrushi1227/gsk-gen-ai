import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

export default function PlotlyChart({ data, layout, config, style }) {
  return (
    <div className="bg-white card-shadow p-6 rounded-2xl">
      <Plot
        data={data}
        layout={{
          ...layout,
          margin: { l: 60, r: 30, t: 30, b: 50 },
          font: { family: "Inter, Arial, sans-serif" },
        }}
        config={{ responsive: true, displayModeBar: false, ...(config || {}) }}
        style={{ width: "100%", height: "100%", ...(style || {}) }}
      />
    </div>
  );
}
