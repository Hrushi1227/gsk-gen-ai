import Plot from "react-plotly.js";

export default function PlotlyChart({ data, layout, config, style }) {
  return (
    <Plot
      data={data}
      layout={layout}
      config={config}
      style={style}
      useResizeHandler={true}
    />
  );
}
