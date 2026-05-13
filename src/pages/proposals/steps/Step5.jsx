import { Plus, X } from "lucide-react";
import FormField from "../../../components/common/FormField";
import { toast } from "react-hot-toast";

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
            Scientists Involved
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
          {form.scientistInvolve.map((scientist, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-4 relative"
            >
              {/* Remove */}
              {form.scientistInvolve.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeScientist(index)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                >
                  <X size={18} />
                </button>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Scientist Name */}
                <FormField
                  label="Scientist Name"
                  value={scientist.scientistName}
                  onChange={(value) => {
                    const updated = [...form.scientistInvolve];

                    updated[index].scientistName = value;

                    update("scientistInvolve")(updated);
                  }}
                  placeholder="Enter scientist name"
                />

                {/* Non Recurring */}
                <FormField
                  label="Non Recurring"
                  value={scientist.nonRecurring}
                  onChange={(value) => {
                    if (/^\d*\.?\d*$/.test(value)) {
                      const updated = [...form.scientistInvolve];

                      updated[index].nonRecurring = value;

                      update("scientistInvolve")(updated);
                    } else {
                      toast.error("Only Numbers are allowed");
                    }
                  }}
                  placeholder="Enter amount"
                />

                {/* Recurring Contingency */}
                <FormField
                  label="Recurring Contingency"
                  value={scientist.recurringContingency}
                  onChange={(value) => {
                    if (/^\d*\.?\d*$/.test(value)) {
                      const updated = [...form.scientistInvolve];

                      updated[index].recurringContingency = value;

                      update("scientistInvolve")(updated);
                    } else {
                      toast.error("Only Numbers are allowed");
                    }
                  }}
                  placeholder="Enter amount"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}