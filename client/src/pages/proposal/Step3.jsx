// Step3.jsx

import { Plus, X } from "lucide-react";
import FormField from "../../components/FormField";

export default function Step3({ form, update, addObjective }) {
  const removeObjective = (index) => {
    const updatedObjectives = form.objectives.filter(
      (_, i) => i !== index
    );

    update("objectives")({
      target: {
        value: updatedObjectives,
      },
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Research Objective
        </h2>

        <button
          type="button"
          onClick={addObjective}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          <Plus size={16} />
          Add Objective
        </button>
      </div>

      {/* Objectives */}
      <div className="space-y-5">
        {form.objectives?.map((objective, index) => (
          <div key={index} className="relative">
            {/* Remove Button */}
            {form.objectives.length > 1 && (
              <button
                type="button"
                onClick={() => removeObjective(index)}
                className="absolute top-2 right-2 z-10 p-1 text-gray-400 hover:text-red-500 transition"
              >
                <X size={16} />
              </button>
            )}

            <FormField
              label={`Objective ${index + 1}`}
              type="textarea"
              value={objective}
              rows={3}
              placeholder="Describe the research objective..."
              onChange={(e) => {
                const updatedObjectives = [...form.objectives];

                updatedObjectives[index] = e.target.value;

                update("objectives")({
                  target: {
                    value: updatedObjectives,
                  },
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 