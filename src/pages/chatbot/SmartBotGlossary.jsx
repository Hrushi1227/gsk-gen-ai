import { Card, Table, Typography } from "antd";
import Sidebar from "../../components/layout/Sidebar";

const { Title, Paragraph } = Typography;

const columns = [
  { title: "Site Category", dataIndex: "siteCategory", key: "siteCategory" },
  { title: "Stage", dataIndex: "stage", key: "stage" },
  { title: "Site Name", dataIndex: "siteName", key: "siteName" },
  {
    title: "Production Lines",
    dataIndex: "productionLines",
    key: "productionLines",
    render: (val) => <div className="text-sm leading-snug">{val}</div>,
  },
];

const data = [
  {
    key: 1,
    siteCategory: "BC",
    stage: "Upstream",
    siteName: "BC",
    productionLines:
      "IVM2, CF05, IVM1, Q-Block, CF06, QF02 Unallocated, Unallocated Filling",
  },
  {
    key: 2,
    siteCategory: "BC",
    stage: "Upstream",
    siteName: "BC",
    productionLines:
      "SBUCP02, SBUCP90, SBUCP21, SBUCP91, Unallocated Pack, SBUCP92",
  },
  {
    key: 3,
    siteCategory: "BC",
    stage: "Upstream",
    siteName: "BC",
    productionLines: "SBUCP97, SBUCP95, SBUCP08, Unallocated Inspection",
  },
  {
    key: 4,
    siteCategory: "BC",
    stage: "Upstream",
    siteName: "BC",
    productionLines:
      "SBUCP20, SBUCP98, SBUCP22, Unallocated Assembly, SBUCP07, SBUCP96",
  },
  {
    key: 5,
    siteCategory: "CMO",
    stage: "Downstream",
    siteName: "API_CMO",
    productionLines: "API_CMO",
  },
  {
    key: 6,
    siteCategory: "CMO",
    stage: "Downstream",
    siteName: "Lonza_20k",
    productionLines: "Lonza_20k",
  },
  {
    key: 7,
    siteCategory: "CMO",
    stage: "Downstream",
    siteName: "Lonza_2k",
    productionLines: "Lonza_2k",
  },
  {
    key: 8,
    siteCategory: "CMO",
    stage: "Downstream",
    siteName: "Samsung",
    productionLines: "SBLP4, SBLP3",
  },
  {
    key: 9,
    siteCategory: "CMO",
    stage: "Downstream",
    siteName: "WUXI",
    productionLines: "WUXI",
  },
  {
    key: 10,
    siteCategory: "CMO",
    stage: "Upstream",
    siteName: "CMO",
    productionLines: "Unallocated Inspection, Patheon Inspection",
  },
  {
    key: 11,
    siteCategory: "CMO",
    stage: "Upstream",
    siteName: "CMO",
    productionLines: "Unallocated Filling, Patheon Filling",
  },
  {
    key: 12,
    siteCategory: "Parma",
    stage: "Upstream",
    siteName: "Parma",
    productionLines: "APKFD001, Unallocated Pack, SCHUBERT, SPKHP001, NEOTOPQ",
  },
  {
    key: 13,
    siteCategory: "Parma",
    stage: "Upstream",
    siteName: "Parma",
    productionLines: "APKAV100, Unallocated Assembly",
  },
  // add more rows as needed...
];

export default function SmartBotGlossary() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-6">
          {/* Page top header */}
          <div className="flex items-center justify-between">
            <div>
              <Title level={2} className="!m-0">
                LTDF-NM Smart Assistant: Capabilities, Assumptions, and Glossary
                of Key Terms
              </Title>
              <Paragraph className="text-gray-600">
                This chatbot is designed to empower stakeholders with actionable
                insights into pharmaceutical manufacturing capacity, demand
                allocation, and operational efficiency. It specializes in
                analyzing complex production scenarios, comparing strategic
                models, and identifying critical risks across global facilities.
              </Paragraph>
            </div>
          </div>
        </div>

        {/* Key capabilities card */}
        <div className="mb-6">
          <Card className="card-shadow rounded-2xl">
            <h3 className="text-lg font-semibold mb-2">Key Capabilities</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>
                Answer queries about production bottlenecks, unallocated demand,
                and asset utilization as both output and input allocation
                parameters.
              </li>
              <li>
                Compare outcomes across strategic models including legacy and
                new models (ex: Baseline, Models 45/123, Models 2025).
              </li>
              <li>
                Evaluate multiple demand scenarios: Base-PoS and Upside-PoS
                (available for all models), and Downside-PoS for specific
                models.
              </li>
            </ul>
          </Card>
        </div>

        {/* Configured sites table card */}
        <div className="mb-6">
          <Card className="card-shadow rounded-2xl" bodyStyle={{ padding: 0 }}>
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold mb-1">
                Currently configured sites / production lines
              </h3>
              <p className="text-sm text-gray-600">
                The Chatbot can answer queries about any of the sites /
                production lines in our data.
              </p>
            </div>

            <div className="p-6">
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 10 }}
                bordered={false}
                size="middle"
                rowKey="key"
                scroll={{ x: 1000 }}
              />
            </div>
          </Card>
        </div>

        {/* additional info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="card-shadow rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Assumptions</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>
                Model outputs are based on input demand snapshots and configured
                capacity constraints at site level.
              </li>
              <li>
                Unallocated production lines indicate capacity that is not
                specifically assigned to a product in the current snapshot.
              </li>
              <li>
                Simulations assume standard lead-times and stable yield
                parameters unless configured otherwise.
              </li>
            </ul>
          </Card>

          <Card className="card-shadow rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Glossary (selected)</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>
                <strong>PoS</strong> — Probability of Success for an indication
                or regimen.
              </li>
              <li>
                <strong>LTDF</strong> — Long Term Demand Forecast (units).
              </li>
              <li>
                <strong>Upstream / Downstream</strong> — Production stage
                categories.
              </li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
}
