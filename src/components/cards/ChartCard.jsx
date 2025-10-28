// src/components/cards/ChartCard.jsx
import PlotlyChart from "../charts/PlotlyChart";

export default function ChartCard({ data, layout }) {
  return (
    <div className="card-shadow rounded-2xl p-6 bg-white">
      <div style={{ height: 480, position: "relative" }}>
        <div className="absolute inset-0">
          <PlotlyChart
            data={data}
            layout={{ ...layout, width: undefined, height: undefined }}
            config={{ responsive: true, displayModeBar: false }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
