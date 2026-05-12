import { Plus, X } from "lucide-react";
import FormField from "../../../components/common/FormField";

export default function Step5({
  form,
  update,
  addScientist,
  removeScientist,
}) {
  return (
    <div>
      {/* Outcome */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Outcome
        </h2>
        <FormField
          label="Expected Outcome"
          value={form.expectedOutcome}
          onChange={update("expectedOutcome")}
          placeholder="Enter expected outcome"
        />
      </div>
      {/* Scientists */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Scientists involved
          </h2>

          <button
            type="button"
            onClick={addScientist}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <Plus size={16} />
            Add
          </button>
        </div>

        <div className="space-y-6">
          {form.scientists.map((scientist, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-4 relative"
            >
              {/* Remove */}
              {form.scientists.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeScientist(index)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                >
                  <X size={18} />
                </button>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Principal Investigator */}
                <FormField
                  label="Principal Investigator"
                  value={scientist.principal}
                  onChange={(value) => {
                    const updated = [...form.scientists];
                    updated[index].principal = value;

                    update("scientists")(updated);
                  }}
                  placeholder="Enter name"
                />

                {/* Co-Principal Investigator */}
                <FormField
                  label="Co-Principal Investigator"
                  value={scientist.coPrincipal}
                  onChange={(value) => {
                    const updated = [...form.scientists];
                    updated[index].coPrincipal = value;

                    update("scientists")(updated);
                  }}
                  placeholder="Enter name"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}