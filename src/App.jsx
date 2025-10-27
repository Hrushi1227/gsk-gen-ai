import { Route, Routes } from "react-router-dom";
import BrandLevelForecastSimulation from "./pages/BrandLevelForecastSimulation.jsx";
import SmartBot from "./pages/chatbot/SmartBot.jsx";
import SmartBotGlossary from "./pages/chatbot/SmartBotGlossary.jsx";
import Dashboard from "./pages/Dashboard";
import ForecastSimulation from "./pages/ForecastSimulation";
import Login from "./pages/login/Login.jsx";
import BrandLevel from "./pages/probscenario/BrandLevel";
import PortfolioLevel from "./pages/probscenario/PortfolioLevel";
import SalesVsForecast from "./pages/report/SalesVsForecast.jsx";
import VarianceRegions from "./pages/report/VarianceRegions.jsx";
import YoYVariance from "./pages/report/YoYVariance.jsx";

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
