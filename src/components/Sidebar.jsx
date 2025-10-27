import {
  BarChartOutlined,
  FileTextOutlined,
  LogoutOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState([]);

  // Set initial open submenu based on current path
  useEffect(() => {
    if (pathname.includes("variance") || pathname === "/sales-vs-forecast") {
      setOpenKeys(["reports"]);
    } else if (pathname.includes("level")) {
      setOpenKeys(["scenario"]);
    } else if (pathname.includes("smart-bot")) {
      setOpenKeys(["smart"]);
    }
  }, [pathname]);

  const onOpenChange = (keys) => {
    // When a submenu is clicked, only that one should be open
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const onSelect = ({ key }) => navigate(key);

  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col justify-between">
      {/* Logo */}
      <div>
        <div className="p-6 border-b">
          <div className="text-gskOrange text-3xl font-bold">GSK</div>
          <div className="text-sm text-gray-600">Strategy AI</div>
        </div>

        {/* Sidebar Menu */}
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onSelect={onSelect}
          style={{ border: "none" }}
        >
          {/* Reports Section */}
          <Menu.SubMenu
            key="reports"
            title="Reports"
            icon={<FileTextOutlined />}
          >
            <Menu.Item key="/sales-vs-forecast">Sales vs. Forecast</Menu.Item>
            <Menu.Item key="/yoy-variance">
              YoY Variance Trend (in Units)
            </Menu.Item>
            <Menu.Item key="/variance-regions">
              Variance Trend across Regions
            </Menu.Item>
          </Menu.SubMenu>

          {/* Probabilistic Scenario Analysis */}
          <Menu.SubMenu
            key="scenario"
            title="Probabilistic Scenario Analysis"
            icon={<BarChartOutlined />}
          >
            <Menu.Item key="/brand-level">Brand Level</Menu.Item>
            <Menu.Item key="/portfolio-level">Portfolio Level</Menu.Item>
          </Menu.SubMenu>

          {/* LTDF-NM Smart Assistant */}
          <Menu.SubMenu
            key="smart"
            title="LTDF-NM Smart Assistant"
            icon={<RobotOutlined />}
          >
            <Menu.Item key="/smart-bot">Smart Bot</Menu.Item>
            <Menu.Item key="/smart-bot-glossary">Smart Bot Glossary</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>

      {/* Footer Section */}
      <div className="p-6 border-t">
        <div className="flex items-center gap-3 mb-3">
          <img
            src="https://i.pravatar.cc/40?img=12"
            alt="user"
            className="rounded-full h-8 w-8"
          />
          <div>
            <div className="text-sm font-medium">John Smith</div>
            <div className="text-xs text-gray-400">Admin</div>
          </div>
        </div>
        <button
          onClick={() => alert("Logout clicked")}
          className="text-gskOrange flex items-center gap-2"
        >
          <LogoutOutlined /> Log Out
        </button>
      </div>
    </aside>
  );
}
