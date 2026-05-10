import FormField from "../../components/FormField";

const STATION_OPTIONS = [
  { value: "station1", label: "Station 1" },
  { value: "station2", label: "Station 2" },
];

const YEAR_OPTIONS = [
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
];

const DISCIPLINE_OPTIONS = [
  { value: "agriculture", label: "Agriculture" },
  { value: "biology", label: "Biology" },
  { value: "chemistry", label: "Chemistry" },
  { value: "physics", label: "Physics" },
];

export default function Step1({ form, update }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Basic Information
      </h2>

      <div className="flex gap-4 mb-6">
        <FormField
          className="flex-1"
          label="Unique Code"
          value={`${Math.floor(100000 + Math.random() * 900000)}`}
          disabled
        />

        <FormField
          className="flex-1"
          label="Stations / Colleges"
          value={form.station}
          onChange={update("station")}
          options={STATION_OPTIONS}
        />

        <FormField
          className="w-36"
          label="Year"
          value={form.year}
          onChange={(value) => {
            // Allow only numbers and max 4 digits
            if (/^\d{0,4}$/.test(value)) {
              update("year")(value);
            }
          }}
        />
      </div>

      <FormField
        className="mb-6"
        label="Name of the Teacher / Scientist"
        value={form.teacherName}
        onChange={update("teacherName")}
        placeholder="Enter your name"
      />

      <FormField
        className="mb-10"
        label="Discipline"
        value={form.discipline}
        onChange={update("discipline")}
        options={DISCIPLINE_OPTIONS}
      />
    </div>
  );
}