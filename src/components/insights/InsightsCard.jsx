// src/components/insights/InsightsCard.jsx
export default function InsightsCard({ title, tags = [], insights = [] }) {
  return (
    <div className="mt-6 bg-white card-shadow rounded-2xl p-6">
      {tags.length > 0 && (
        <div className="inline-flex gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-orange-50 text-gskOrange rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ul className="list-disc ml-6 text-gray-700">
        {insights.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
