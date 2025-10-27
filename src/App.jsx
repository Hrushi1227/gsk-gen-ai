import { Route, Routes } from "react-router-dom";
import BrandLevel from "./pages/BrandLevel";
import BrandLevelForecastSimulation from "./pages/BrandLevelForecastSimulation.jsx";
import Dashboard from "./pages/Dashboard";
import ForecastSimulation from "./pages/ForecastSimulation";
import Login from "./pages/Login";
import PortfolioLevel from "./pages/PortfolioLevel";
import SalesVsForecast from "./pages/SalesVsForecast.jsx";
import SmartBot from "./pages/SmartBot.jsx";
import SmartBotGlossary from "./pages/SmartBotGlossary.jsx";
import VarianceRegions from "./pages/VarianceRegions";
import YoYVariance from "./pages/YoYVariance";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/yoy-variance" element={<YoYVariance />} />
      <Route path="/variance-regions" element={<VarianceRegions />} />
      <Route path="/brand-level" element={<BrandLevel />} />
      <Route path="/forecast-simulation" element={<ForecastSimulation />} />
      <Route path="/portfolio-level" element={<PortfolioLevel />} />
      <Route path="/smart-bot-glossary" element={<SmartBotGlossary />} />
      <Route path="/sales-vs-forecast" element={<SalesVsForecast />} />
      <Route path="/smart-bot" element={<SmartBot />} />
      <Route
        path="/brand-level/forecast-simulation"
        element={<BrandLevelForecastSimulation />}
      />
      <Route
        path="/brand-level/new/estimating"
        element={<BrandLevelForecastSimulation tab="estimating" />}
      />
      <Route
        path="/brand-level/new/forecast"
        element={<BrandLevelForecastSimulation tab="forecast" />}
      />
    </Routes>
  );
}

export default App;
