import { Tabs } from "antd";
import { useState } from "react";
import ChartCard from "../../components/cards/ChartCard";
import FilterBar from "../../components/filters/FilterBar";
import InsightsCard from "../../components/insights/InsightsCard";
import Sidebar from "../../components/layout/Sidebar";
import useSalesVsForecastData from "../../hooks/useSalesVsForecastData";

const { TabPane } = Tabs;

export default function SalesVsForecast() {
  const [filters, setFilters] = useState({
    product: "Benlysta IV",
    region: "Global",
    frequency: "Yearly",
  });

  const [activeTag, setActiveTag] = useState(null); // to track which pill was clicked
  const { data, loading } = useSalesVsForecastData();

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const layout = {
    yaxis: { title: "Value (in Units)", tickformat: ",.0f", automargin: true },
    xaxis: { title: "Year", automargin: true },
    legend: { orientation: "h", y: -0.2, x: 0.5, xanchor: "center" },
    margin: { l: 80, r: 40, t: 20, b: 100 },
    hovermode: "x unified",
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };

  const productRegionCombos = [
    { product: "Benlysta IV", region: "Global" },
    { product: "Benlysta SC", region: "US" },
    { product: "Benlysta SC", region: "Europe" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto p-8">
          {/* Header */}
          <h1 className="text-2xl font-bold mb-2">
            Actual Sales vs. Long Term Demand Forecast (LTDF)
          </h1>
          <p className="text-gray-600 mb-6">
            Compare actual sales and LTDF forecasts across multiple product and
            region combinations.
          </p>

          {/* Filters */}
          <FilterBar {...filters} onChange={handleFilterChange} />

          {loading ? (
            <p>Loading data...</p>
          ) : (
            <>
              <ChartCard data={data} layout={layout} />

              {/* Tabs Section */}
              <div className="mt-8">
                <Tabs defaultActiveKey="0" centered>
                  {productRegionCombos.map((combo, idx) => (
                    <TabPane
                      key={idx}
                      tab={`${combo.product} in ${combo.region} Region`}
                    >
                      {/* Orange clickable tags under tab */}
                      <div className="flex flex-wrap gap-3 mb-4 justify-center">
                        <button
                          onClick={() => setActiveTag("product")}
                          className={`px-3 py-1 rounded-full font-medium text-sm transition ${
                            activeTag === "product"
                              ? "bg-orange-600 text-white"
                              : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                          }`}
                        >
                          Product: {combo.product}
                        </button>

                        <button
                          onClick={() => setActiveTag("region")}
                          className={`px-3 py-1 rounded-full font-medium text-sm transition ${
                            activeTag === "region"
                              ? "bg-orange-600 text-white"
                              : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                          }`}
                        >
                          Region: {combo.region}
                        </button>

                        <button
                          onClick={() => setActiveTag("frequency")}
                          className={`px-3 py-1 rounded-full font-medium text-sm transition ${
                            activeTag === "frequency"
                              ? "bg-orange-600 text-white"
                              : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                          }`}
                        >
                          Frequency: Yearly
                        </button>
                      </div>

                      {/* Conditional rendering based on clicked pill */}
                      {activeTag ? (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center text-gray-600">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Selected Section: {activeTag.toUpperCase()}
                          </h3>
                          <p>
                            Content area for <strong>{activeTag}</strong> — to
                            be implemented later.
                          </p>
                        </div>
                      ) : (
                        <InsightsCard
                          title={`${combo.product} in ${combo.region} Region`}
                          tags={[
                            `Product: ${combo.product}`,
                            `Region: ${combo.region}`,
                            "Frequency: Yearly",
                          ]}
                          insights={[
                            `Sales in ${combo.region} closely tracked LTDF forecasts for ${combo.product}.`,
                            `Forecast accuracy improved for ${combo.product} with quarterly updates.`,
                            `Deviations mainly occurred during early launch years.`,
                          ]}
                        />
                      )}
                    </TabPane>
                  ))}
                </Tabs>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
