/**
 * FormField — renders a label + input, select, or textarea.
 */

export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  options = [],
  rows = 3,
  className = "",
  disabled = false,
}) {
  const base =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm text-gray-600 mb-1">
          {label}
        </label>
      )}

      {type === "select" ? (
        <select
          size={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} text-gray-700 h-11 bg-white`}
        >
          {/* Hidden placeholder */}
          <option value="" disabled hidden>
            Select {label}
          </option>

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={base}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={base}
        />
      )}
    </div>
  );
}