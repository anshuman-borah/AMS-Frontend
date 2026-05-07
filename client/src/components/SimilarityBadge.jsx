export default function SimilarityBadge({ value }) {
  const style =
    value >= 80 ? "bg-red-100 text-red-700" :
    value >= 40 ? "bg-yellow-100 text-yellow-700" :
                  "bg-green-100 text-green-700";
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${style}`}>
      {value}%
    </span>
  );
}