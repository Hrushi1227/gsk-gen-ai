// src/components/filters/FilterBar.jsx
import { Select } from "antd";
const { Option } = Select;

export default function FilterBar({ product, region, frequency, onChange }) {
  return (
    <div className="flex gap-4 mb-6">
      <Select
        value={product}
        onChange={(val) => onChange("product", val)}
        style={{ width: 220 }}
      >
        <Option>Benlysta IV</Option>
        <Option>Benlysta SC</Option>
      </Select>

      <Select
        value={region}
        onChange={(val) => onChange("region", val)}
        style={{ width: 160 }}
      >
        <Option>Global</Option>
        <Option>US</Option>
        <Option>EU</Option>
      </Select>

      <Select
        value={frequency}
        onChange={(val) => onChange("frequency", val)}
        style={{ width: 160 }}
      >
        <Option>Yearly</Option>
        <Option>Quarterly</Option>
        <Option>Monthly</Option>
      </Select>
    </div>
  );
}
