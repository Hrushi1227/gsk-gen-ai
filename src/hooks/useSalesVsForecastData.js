// src/hooks/useSalesVsForecastData.js
import { useEffect, useState } from "react";
// import { fetchSalesVsForecast } from "../api/salesApi";

export default function useSalesVsForecastData() {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data now, API later
    const yearsArr = Array.from({ length: 13 }, (_, i) => 2019 + i);
    const actual = [
      3800000, 4500000, 6200000, 6000000, 6100000, 8000000, 6200000, 6800000,
      7600000, 9000000, 9600000, 9900000, 10200000,
    ];
    const f2019 = [
      1000000, 1500000, 2000000, 2500000, 3200000, 4200000, 4700000, 5200000,
      5600000, 6000000, 6400000, 6800000, 7000000,
    ];
    const f2020 = f2019.map((v) => v * 1.1);
    const f2021 = f2019.map((v) => v * 1.2);
    const f2022 = f2019.map((v) => v * 1.3);
    const f2023 = f2019.map((v) => v * 1.4);

    setData([
      {
        x: yearsArr,
        y: actual,
        mode: "lines+markers",
        name: "Actual Sales",
        line: { color: "#062241", width: 3 },
        marker: { size: 6 },
      },
      {
        x: yearsArr,
        y: f2019,
        mode: "lines",
        name: "2019 Forecast",
        line: { dash: "dash", color: "#EC4899" },
      },
      {
        x: yearsArr,
        y: f2020,
        mode: "lines",
        name: "2020 Forecast",
        line: { dash: "dash", color: "#F59E0B" },
      },
      {
        x: yearsArr,
        y: f2021,
        mode: "lines",
        name: "2021 Forecast",
        line: { dash: "dash", color: "#8B5E3C" },
      },
      {
        x: yearsArr,
        y: f2022,
        mode: "lines",
        name: "2022 Forecast",
        line: { dash: "dash", color: "#06B6D4" },
      },
      {
        x: yearsArr,
        y: f2023,
        mode: "lines",
        name: "2023 Forecast",
        line: { dash: "dash", color: "#3B82F6" },
      },
    ]);

    setYears(yearsArr);
    setLoading(false);
  }, []);

  return { data, years, loading };
}
