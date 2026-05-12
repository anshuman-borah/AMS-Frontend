/**
 * FormField — renders a label + input, select, or textarea.
 *
 * Props:
 *   label      string   — field label
 *   type       string   — "text" | "email" | "select" | "textarea" (default "text")
 *   value      string
 *   onChange   fn(value)
 *   placeholder string
 *   options    [{ value, label }]  — only for type="select"
 *   rows       number             — only for type="textarea"
 *   className  string             — extra wrapper classes
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
}) {
  const base =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className={className}>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>

      {type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} text-gray-500`}
        >
          <option value="">Auto-Generated</option>
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
          className={base}
        />
      )}
    </div>
  );
}