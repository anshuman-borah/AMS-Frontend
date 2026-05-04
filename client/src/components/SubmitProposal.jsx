import { useState } from "react";
import { Check } from "lucide-react";
const steps = [
  { number: 1, label: "Basic Info" },
  { number: 2, label: "Details" },
  { number: 3, label: "Objective" },
  { number: 4, label: "Budget" },
  { number: 5, label: "Review" },
];

export default function SubmitProposal() {
  const [currentStep, setCurrentStep] = useState(1);

  // Form state
  const [form, setForm] = useState({
    uniqueCode: "",
    station: "",
    year: "",
    teacherName: "",
    discipline: "",
  });

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="flex-1 bg-white h-full p-8 overflow-y-auto">
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Submit Research Proposal</h1>
      <p className="text-gray-500 mb-8 text-sm">Complete all steps to submit your proposal for review</p>

      {/* STEPPER */}
      <div className="flex items-center mb-10">
        {steps.map((step, idx) => (
          <div key={step.number} className="flex items-center">
            {/* Circle */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => setCurrentStep(step.number)}
                className={`w-14 h-14 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-all
                  ${currentStep === step.number
                    ? "bg-blue-600 border-blue-600 text-white"
                    : currentStep > step.number
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-white border-gray-300 text-gray-400"
                  }`}
              >
                {currentStep > step.number ?<Check size={20} />: step.number}
              </button>
              <span className={`text-xs mt-1 ${currentStep === step.number ? "text-gray-800 font-semibold" : "text-gray-400"}`}>
                {step.label}
              </span>
            </div>
            {/* Connector */}
            {idx < steps.length - 1 && (
              <div className={`h-0.5 w-32 mx-1 mb-5 ${currentStep > step.number ? "bg-green-500" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* STEP 1 CONTENT */}
      {currentStep === 1 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Basic Information</h2>

          {/* ROW 1 */}
          <div className="flex gap-4 mb-6">
            {/* Unique Code */}
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Unique Code</label>
              <input
                type="text"
                value={form.uniqueCode}
                onChange={(e) => update("uniqueCode", e.target.value)}
                placeholder="Station/year/Discipline/ Serial No (P)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Stations/Colleges */}
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Stations/Colleges</label>
              <div className="relative">
                <select
                  value={form.station}
                  onChange={(e) => update("station", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Auto-Generated</option>
                  <option value="station1">Station 1</option>
                  <option value="station2">Station 2</option>
                </select>
                <span className="absolute right-3 top-2.5 pointer-events-none text-gray-400">▼</span>
              </div>
            </div>

            {/* Year */}
            <div className="w-36">
              <label className="block text-sm text-gray-600 mb-1">Year</label>
              <div className="relative">
                <select
                  value={form.year}
                  onChange={(e) => update("year", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Auto-Generated</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
                <span className="absolute right-3 top-2.5 pointer-events-none text-gray-400">▼</span>
              </div>
            </div>
          </div>

          {/* ROW 2 - Teacher Name */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">Name of the teacher /Scientist</label>
            <input
              type="text"
              value={form.teacherName}
              onChange={(e) => update("teacherName", e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* ROW 3 - Discipline */}
          <div className="mb-12">
            <label className="block text-sm text-gray-600 mb-1">Discipline</label>
            <div className="relative">
              <select
                value={form.discipline}
                onChange={(e) => update("discipline", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Auto-Generated</option>
                <option value="agriculture">Agriculture</option>
                <option value="biology">Biology</option>
                <option value="chemistry">Chemistry</option>
                <option value="physics">Physics</option>
              </select>
              <span className="absolute right-3 top-2.5 pointer-events-none text-gray-400">▼</span>
            </div>
          </div>
        </div>
      )}

      {/* PLACEHOLDER FOR OTHER STEPS */}
      {currentStep === 2 && <div className="text-gray-400 py-20 text-center">Step 2: Details (coming soon)</div>}
      {currentStep === 3 && <div className="text-gray-400 py-20 text-center">Step 3: Objective (coming soon)</div>}
      {currentStep === 4 && <div className="text-gray-400 py-20 text-center">Step 4: Budget (coming soon)</div>}
      {currentStep === 5 && <div className="text-gray-400 py-20 text-center">Step 5: Review (coming soon)</div>}

      {/* NAVIGATION BUTTONS */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
          className="px-8 py-2 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep((s) => Math.min(5, s + 1))}
          className="px-8 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
}